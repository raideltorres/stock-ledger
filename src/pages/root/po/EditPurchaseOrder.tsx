import { ListItemSkeleton } from "@/components/common/ListItemSkeleton";
import ConfirmInvoicePo from "@/components/po-trans/ConfirmInvoicePo";
import ConfirmReceivePo from "@/components/po-trans/ConfirmReceivePo";
import NewPoTransLine from "@/components/po-trans/NewPoTransLine";
import PoTransHeader from "@/components/po-trans/PoTransHeader";
import { PoTransLineItem } from "@/components/po-trans/PoTransLineItem";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/useToast";
import {
  useGetPoTransByIdQuery,
  useInvoicePoTransMutation,
  useReceivePoTransMutation,
  useUpdatePoTransMutation,
} from "@/store/api/po-trans";
import { useCreateProductMutation } from "@/store/api/products";
import {
  selectPoTransDetailStateSlice,
  setPoTransDetailStateSlice,
} from "@/store/slices";
import type {
  ActionData,
  ErrorResponse,
  NewPoTransLineData,
  PoTransLine,
  PoTransLineArgs,
} from "@/utils/types";
import { Banknote, PackagePlus, PlusSquare } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function EditPurchaseOrder() {
  const { transId } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const poTransDetailState = useSelector(selectPoTransDetailStateSlice);

  const { data: poTransDetailData, isFetching: isFetchingPoTrans } =
    useGetPoTransByIdQuery(transId!, {
      skip: !transId || !poTransDetailState,
    });
  const [createProduct] = useCreateProductMutation();
  const [updatePoTrans] = useUpdatePoTransMutation();
  const [receivePoTrans] = useReceivePoTransMutation();
  const [invoicePoTrans] = useInvoicePoTransMutation();

  const updatePurchaseOrder = useCallback(
    async (lines: PoTransLine[]) => {
      let totalAmount = 0;
      const mappedLines = lines.map((line) => {
        totalAmount += line.amount || 0;

        return {
          product: line.product?._id,
          unitPrice: line.unitPrice,
          qty: line.qty,
          amount: line.amount,
        };
      }) as PoTransLineArgs[];

      try {
        await updatePoTrans({
          _id: poTransDetailState.order?._id,
          partial: {
            lines: mappedLines,
            amount: totalAmount,
          },
        }).unwrap();
      } catch (error) {
        if (typeof error === "object" && error !== null && "data" in error) {
          const errorData = error as ErrorResponse;
          toast.error(errorData.data.error, {
            description: errorData.data.message,
            dismissible: true,
            duration: 5000,
            position: "top-right",
          });
        } else {
          toast.error("Error inesperado", {
            description: "Ocurrió un error al actualizar la orden de compra.",
            dismissible: true,
            duration: 5000,
            position: "top-right",
          });
        }
      }
    },
    [poTransDetailState.order?._id, toast, updatePoTrans]
  );

  const handleOnLineItemAction = useCallback(
    async (index: number, data: ActionData<PoTransLine>) => {
      const copyOfEditedLines = [...poTransDetailState.editedLines!];

      switch (data.action) {
        case "DELETE":
          copyOfEditedLines.splice(index, 1);
          await updatePurchaseOrder(copyOfEditedLines);
          break;

        default: {
          // EDIT
          const lineOnIndex = copyOfEditedLines[index];
          const calculatedAmount =
            (data.partial?.unitPrice ?? 1) * (data.partial?.qty ?? 1);
          const editedLine: PoTransLine = {
            ...lineOnIndex,
            ...data.partial,
            amount: calculatedAmount,
          };

          copyOfEditedLines[index] = editedLine;
          await updatePurchaseOrder(copyOfEditedLines);
          break;
        }
      }
    },
    [poTransDetailState.editedLines, updatePurchaseOrder]
  );

  const handleNewPoTransLine = useCallback(
    async (data: NewPoTransLineData) => {
      const currentLines = poTransDetailState.editedLines!;
      let productId = data.product;

      if (!productId) {
        const newProduct = await createProduct({
          barcode: data.barcode,
          name: data.name,
        }).unwrap();
        productId = newProduct._id;
      }

      const calculatedAmount = data.unitPrice! * data.qty!;
      const newLine: PoTransLineArgs = {
        product: productId,
        unitPrice: data.unitPrice,
        qty: data.qty,
        amount: calculatedAmount,
      };

      // check if we have a line with the same product and unit price on the current order
      const existingLineIndex = currentLines.findIndex(
        (line) =>
          line.product?._id === newLine.product &&
          line.unitPrice === newLine.unitPrice
      );

      if (existingLineIndex !== -1) {
        const existingLine = currentLines[existingLineIndex];

        // If it exists, update the quantity and amount
        const updatedQty = existingLine.qty! + newLine.qty!;
        const updatedAmount = updatedQty * newLine.unitPrice!;
        const updatedLine: PoTransLine = {
          ...existingLine,
          qty: updatedQty,
          amount: updatedAmount,
        };
        const updatedLines = [...currentLines];
        updatedLines[existingLineIndex] = updatedLine;
        updatePurchaseOrder(updatedLines);
      } else {
        // If it doesn't exist, add a new line
        const newLineItem: PoTransLine = {
          ...newLine,
          product: {
            _id: newLine.product,
            barcode: data.barcode,
            name: data.name,
          },
        };
        updatePurchaseOrder([...currentLines, newLineItem]);
      }
    },
    [createProduct, poTransDetailState.editedLines, updatePurchaseOrder]
  );

  const handleReceivePoTrans = useCallback(async () => {
    if (!poTransDetailState.order?._id) return;
    try {
      await receivePoTrans(poTransDetailState.order._id).unwrap();
    } catch (error) {
      if (typeof error === "object" && error !== null && "data" in error) {
        const errorData = error as ErrorResponse;
        toast.error(errorData.data.error, {
          description: errorData.data.message,
          dismissible: true,
          duration: 5000,
          position: "top-right",
        });
      } else {
        toast.error("Error inesperado", {
          description: "Ocurrió un error al recibir la orden de compra.",
          dismissible: true,
          duration: 5000,
          position: "top-right",
        });
      }
    }
  }, [poTransDetailState.order?._id, receivePoTrans, toast]);

  const handleInvoicePoTrans = useCallback(async () => {
    if (!poTransDetailState.order?._id) return;
    try {
      await invoicePoTrans(poTransDetailState.order._id).unwrap();
    } catch (error) {
      if (typeof error === "object" && error !== null && "data" in error) {
        const errorData = error as ErrorResponse;
        toast.error(errorData.data.error, {
          description: errorData.data.message,
          dismissible: true,
          duration: 5000,
          position: "top-right",
        });
      } else {
        toast.error("Error inesperado", {
          description: "Ocurrió un error al pagar la orden de compra.",
          dismissible: true,
          duration: 5000,
          position: "top-right",
        });
      }
    }
  }, [poTransDetailState.order?._id, invoicePoTrans, toast]);

  useEffect(() => {
    if (!isFetchingPoTrans && poTransDetailData) {
      dispatch(
        setPoTransDetailStateSlice({
          order: poTransDetailData,
          editedLines:
            poTransDetailData.lines?.map((line) => ({
              ...line,
            })) || [],
        })
      );
    }
  }, [dispatch, isFetchingPoTrans, poTransDetailData]);

  return (
    <div className="relative w-full flex flex-col items-start justify-start gap-3 pt-8 px-3">
      <PoTransHeader
        orderId={poTransDetailState.order?._id ?? ""}
        location={poTransDetailState.order?.location}
        user={poTransDetailState.order?.user}
        provider={poTransDetailState.order?.provider}
        status={poTransDetailState.order?.status}
        total={poTransDetailState.order?.amount}
      />

      {/* new poTrans Line only if order is quoted*/}
      <div className="h-9 w-full flex flex-row items-center justify-end -mt-12 gap-4">
        {/* Invoice */}
        {poTransDetailState.order?.status === "RECEIVED" && (
          <Popover>
            <PopoverTrigger asChild>
              <Banknote
                size={36}
                className="bg-gray-300 p-1 border rounded-sm shadow cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent>
              <ConfirmInvoicePo onConfirm={handleInvoicePoTrans} />
            </PopoverContent>
          </Popover>
        )}

        {/* Receive */}
        {poTransDetailState.order?.status === "QUOTED" && (
          <Popover>
            <PopoverTrigger asChild>
              <PackagePlus
                size={36}
                className="bg-gray-300 p-1 border rounded-sm shadow cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent>
              <ConfirmReceivePo onConfirm={handleReceivePoTrans} />
            </PopoverContent>
          </Popover>
        )}

        {/* Add lines */}
        {poTransDetailState.order?.status === "QUOTED" && (
          <Popover>
            <PopoverTrigger asChild>
              <PlusSquare
                size={36}
                className="bg-gray-300 p-1 border rounded-sm shadow cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent>
              <NewPoTransLine onNewPoTransLine={handleNewPoTransLine} />
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="w-full flex flex-1 flex-col gap-2 pt-3 border-t">
        {isFetchingPoTrans && <ListItemSkeleton />}
        {!isFetchingPoTrans &&
          poTransDetailState.editedLines!.length > 0 &&
          poTransDetailState.editedLines!.map((line, index) => (
            <PoTransLineItem
              key={`po-tran-line-${index}`}
              index={index}
              line={line}
              editable={poTransDetailState.order?.status === "QUOTED"}
              onAction={handleOnLineItemAction}
            />
          ))}
        {!isFetchingPoTrans && poTransDetailState.editedLines!.length === 0 && (
          <div className="w-full flex items-center justify-center">
            Orden vacía
          </div>
        )}
      </div>
    </div>
  );
}
