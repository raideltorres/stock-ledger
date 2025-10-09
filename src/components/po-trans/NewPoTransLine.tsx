import type { NewPoTransLineData } from "@/utils/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/useToast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomDialog } from "@/components/common/CustomDialog";
import { BarcodeScanner } from "@/components/device/BarCodeScanner";
import type { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { Input } from "@/components/ui/input";
import { Barcode } from "lucide-react";
import { debounce } from "lodash";
import { useGetProductByBarcodeQuery } from "@/store/api/products";
import { isNumeric } from "@/lib/utils";

const newPoTransLineSchema = z.object({
  product: z.string().optional(),
  barcode: z.string().min(1, "Campo requerido"),
  name: z.string().min(1, "Campo requerido"),
  unitPrice: z.string().min(1, "Campo requerido"),
  qty: z.string().min(1, "Campo requerido"),
});

type NewPoTransLineValues = z.infer<typeof newPoTransLineSchema>;

export interface NewPoTransLineProps {
  onNewPoTransLine?: (data: NewPoTransLineData) => void;
}

export default function NewPoTransLine({
  onNewPoTransLine,
}: NewPoTransLineProps) {
  const toast = useToast();
  const form = useForm<NewPoTransLineValues>({
    resolver: zodResolver(newPoTransLineSchema),
    defaultValues: {
      product: "",
      barcode: "",
      name: "",
      unitPrice: "",
      qty: "1",
    },
  });

  const [searchBarcode, setSearchBarcode] = useState<string | undefined>("");
  const [scannerDialogOpen, setScannerDialogOpen] = useState(false);

  const {
    data: productData,
    isFetching: isFetchingProduct,
    isError: isFetchingProductError,
    error: fetchingProductError,
  } = useGetProductByBarcodeQuery(searchBarcode!, {
    skip: !searchBarcode || searchBarcode.length < 1,
    refetchOnMountOrArgChange: true,
  });

  const handleBarcodeChange = useMemo(
    () =>
      debounce((value: string) => {
        setSearchBarcode(value);
      }, 1000),
    []
  );

  // Clean up the memorized handleBarcodeChange
  useEffect(() => {
    return () => {
      handleBarcodeChange.cancel();
    };
  }, [handleBarcodeChange]);

  const handleOnScannerResult = useCallback(
    async (data: IDetectedBarcode[]) => {
      setScannerDialogOpen(false);

      if (!data || data.length === 0) {
        toast.error("Error de escaneo", {
          description: "No se detectó ningún código de barras",
          dismissible: true,
          duration: 5000,
          position: "top-right",
        });
        return;
      }

      const rawBarcode = data[0].rawValue;
      if (isNumeric(rawBarcode)) {
        form.setValue("barcode", rawBarcode);
        handleBarcodeChange(rawBarcode);
      } else {
        toast.error("Error de escaneo", {
          description:
            "Código de barras no válido, el código debe ser numérico",
          dismissible: true,
          duration: 5000,
          position: "top-right",
        });
      }
    },
    [form, handleBarcodeChange, toast]
  );

  const onBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNumeric(value)) {
      form.setValue("barcode", value);
      handleBarcodeChange(value);
    }
  };

  const handleNewPoTransLine = useCallback(
    async (data: NewPoTransLineValues) => {
      const unitPrice = parseFloat(data.unitPrice);

      if (!isNaN(unitPrice)) {
        onNewPoTransLine?.({
          product: data.product,
          barcode: data.barcode,
          name: data.name,
          unitPrice,
          qty: parseFloat(data.qty),
        });
      }

      setSearchBarcode(undefined);
    },
    [onNewPoTransLine]
  );

  useEffect(() => {
    if (
      searchBarcode &&
      !isFetchingProduct &&
      !isFetchingProductError &&
      !fetchingProductError &&
      productData
    ) {
      form.setValue("product", productData._id);
      form.setValue("name", productData.name || "");
      setSearchBarcode(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchingProductError,
    form,
    isFetchingProduct,
    isFetchingProductError,
    productData,
  ]);

  useEffect(() => {
    if (
      searchBarcode &&
      !isFetchingProduct &&
      isFetchingProductError &&
      fetchingProductError
    ) {
      toast.error("No encontrado", {
        description: "Código de barra no encontrado en el inventario",
        dismissible: true,
        duration: 5000,
        position: "top-right",
      });

      form.setValue("product", "");
      form.setValue("name", "");
      setSearchBarcode(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchingProductError,
    form,
    isFetchingProduct,
    isFetchingProductError,
    toast,
  ]);

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Adicionar producto</h4>
      </div>

      <div className="grid gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleNewPoTransLine)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="hidden" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de barra</FormLabel>
                  <FormControl>
                    <div className="w-full flex flex-row items-center justify-between gap-2">
                      <Input
                        placeholder="Código de barra del producto"
                        {...field}
                        onChange={onBarcodeChange}
                      />
                      <Barcode
                        size={36}
                        className="w-11 bg-gray-200 p-1 border rounded-sm shadow cursor-pointer"
                        onClick={() => setScannerDialogOpen(true)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del producto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unitPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio unitario</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Precio unitario del producto"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (isNumeric(value)) {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cantidad de unidades"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (isNumeric(value)) {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Adicionar
            </Button>
          </form>
        </Form>
      </div>

      <CustomDialog
        isOpen={scannerDialogOpen}
        onDismiss={() => {
          setScannerDialogOpen(false);
        }}
      >
        <BarcodeScanner onResult={handleOnScannerResult} />
      </CustomDialog>
    </div>
  );
}
