import { ListItemSkeleton } from "@/components/common/ListItemSkeleton";
import ConfirmSellSo from "@/components/so-trans/ConfirmSellSo";
import NewSoTransLine from "@/components/so-trans/NewSoTransLine";
import SoTransHeader from "@/components/so-trans/SoTransHeader";
import { SoTransLineItem } from "@/components/so-trans/SoTransLineItem";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/useToast";
import {
  useGetSoTransByIdQuery,
  useSellSoTransMutation,
  useUpdateSoTransMutation,
} from "@/store/api/so-trans";
import {
  selectSoTransDetailStateSlice,
  setSoTransDetailStateSlice,
} from "@/store/slices";
import type {
  ActionData,
  ErrorResponse,
  NewSoTransLineData,
  SoTransLine,
  SoTransLineArgs,
} from "@/utils/types";
import { Banknote, PlusSquare } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function EditSellOrder() {
  const { transId } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const soTransDetailState = useSelector(selectSoTransDetailStateSlice);

  const { data: soTransDetailData, isFetching: isFetchingSoTrans } =
    useGetSoTransByIdQuery(transId!, {
      skip: !transId,
    });
  const [updateSoTrans] = useUpdateSoTransMutation();
  const [sellSoTrans] = useSellSoTransMutation();

  const updateSellOrder = useCallback(
    async (lines: SoTransLine[]) => {
      let totalAmount = 0;
      const mappedLines = lines.map((line) => {
        totalAmount += line.amount || 0;

        return {
          product: line.product?._id,
          unitPrice: line.unitPrice,
          qty: line.qty,
          amount: line.amount,
        };
      }) as SoTransLineArgs[];

      try {
        await updateSoTrans({
          _id: soTransDetailState.order?._id,
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
    [soTransDetailState.order?._id, toast, updateSoTrans]
  );

  const handleOnLineItemAction = useCallback(
    async (index: number, data: ActionData<SoTransLine>) => {
      const copyOfEditedLines = [...soTransDetailState.editedLines!];

      switch (data.action) {
        case "DELETE":
          copyOfEditedLines.splice(index, 1);
          await updateSellOrder(copyOfEditedLines);
          break;

        default: {
          // EDIT
          const lineOnIndex = copyOfEditedLines[index];
          const editedLine: SoTransLine = {
            ...lineOnIndex,
            ...data.partial,
          };

          copyOfEditedLines[index] = editedLine;
          await updateSellOrder(copyOfEditedLines);
          break;
        }
      }
    },
    [soTransDetailState.editedLines, updateSellOrder]
  );

  const handleNewSoTransLine = useCallback(
    async (data: NewSoTransLineData) => {
      const currentLines = soTransDetailState.editedLines!;
      const productId = data.product;

      if (!productId) {
        return;
      }

      const calculatedAmount = data.unitPrice! * data.qty!;
      const newLine: SoTransLineArgs = {
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
        const updatedLine: SoTransLine = {
          ...existingLine,
          qty: updatedQty,
          amount: updatedAmount,
        };
        const updatedLines = [...currentLines];
        updatedLines[existingLineIndex] = updatedLine;
        updateSellOrder(updatedLines);
      } else {
        // If it doesn't exist, add a new line
        const newLineItem: SoTransLine = {
          ...newLine,
          product: {
            _id: newLine.product,
            barcode: data.barcode,
            name: data.name,
          },
        };
        updateSellOrder([...currentLines, newLineItem]);
      }
    },
    [soTransDetailState.editedLines, updateSellOrder]
  );

  const handleSellSoTrans = useCallback(async () => {
    if (!soTransDetailState.order?._id) return;
    try {
      await sellSoTrans(soTransDetailState.order._id).unwrap();
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
          description: "Ocurrió un error al procesar la orden de venta.",
          dismissible: true,
          duration: 5000,
          position: "top-right",
        });
      }
    }
  }, [soTransDetailState.order?._id, sellSoTrans, toast]);

  useEffect(() => {
    if (!isFetchingSoTrans && soTransDetailData) {
      dispatch(
        setSoTransDetailStateSlice({
          order: soTransDetailData,
          editedLines:
            soTransDetailData.lines?.map((line) => ({
              ...line,
            })) || [],
        })
      );
    }
  }, [dispatch, isFetchingSoTrans, soTransDetailData]);

  return (
    <div className="relative w-full flex flex-col items-start justify-start gap-3 pt-8 px-3">
      <SoTransHeader
        orderId={soTransDetailState.order?._id ?? ""}
        location={soTransDetailState.order?.location}
        user={soTransDetailState.order?.user}
        customer={soTransDetailState.order?.customer}
        status={soTransDetailState.order?.status}
        total={soTransDetailState.order?.amount}
      />

      {/* new soTrans Line only if order is quoted*/}
      <div className="h-9 w-full flex flex-row items-center justify-end -mt-12 gap-4">
        {/* Sell */}
        {soTransDetailState.order?.status === "QUOTED" && (
          <Popover>
            <PopoverTrigger asChild>
              <Banknote
                size={36}
                className="bg-gray-300 p-1 border rounded-sm shadow cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent>
              <ConfirmSellSo onConfirm={handleSellSoTrans} />
            </PopoverContent>
          </Popover>
        )}

        {/* Add lines */}
        {soTransDetailState.order?.status === "QUOTED" && (
          <Popover>
            <PopoverTrigger asChild>
              <PlusSquare
                size={36}
                className="bg-gray-300 p-1 border rounded-sm shadow cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent>
              <NewSoTransLine onNewSoTransLine={handleNewSoTransLine} />
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="w-full flex flex-1 flex-col items-center gap-2 pt-3 border-t">
        {isFetchingSoTrans && <ListItemSkeleton />}
        {!isFetchingSoTrans &&
          soTransDetailState.editedLines!.length > 0 &&
          soTransDetailState.editedLines!.map((line, index) => (
            <SoTransLineItem
              key={`so-tran-line-${index}`}
              index={index}
              line={line}
              editable={soTransDetailState.order?.status === "QUOTED"}
              onAction={handleOnLineItemAction}
            />
          ))}
        {!isFetchingSoTrans && soTransDetailState.editedLines!.length === 0 && (
          <div className="w-full flex items-center justify-center">
            Orden vacía
          </div>
        )}
      </div>
    </div>
  );
}
