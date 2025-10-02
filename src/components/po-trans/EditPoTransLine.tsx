import type { PoTransLine, PoTransLineArgs } from "@/utils/types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { isNumeric } from "@/lib/utils";

const editPoTransLineSchema = z.object({
  unitPrice: z.string().min(1, "Campo requerido"),
  qty: z.string().min(1, "Campo requerido"),
});

type EditPoTransLineValues = z.infer<typeof editPoTransLineSchema>;

export interface EditPoTransLineProps {
  line: PoTransLine;
  onChange?: (partial: PoTransLineArgs) => void;
}

export default function EditPoTransLine({
  line,
  onChange,
}: EditPoTransLineProps) {
  const form = useForm<EditPoTransLineValues>({
    resolver: zodResolver(editPoTransLineSchema),
    defaultValues: {
      unitPrice: line.unitPrice?.toString() || "",
      qty: line.qty?.toString() || "",
    },
  });

  const handleEditPoTransLine = useCallback(
    async (data: EditPoTransLineValues) => {
      onChange?.({
        unitPrice: parseFloat(data.unitPrice),
        qty: parseFloat(data.qty),
      });
    },
    [onChange]
  );

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Actualizar línea</h4>
      </div>
      <div className="grid gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditPoTransLine)}
            className="space-y-6"
          >
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
              Actualizar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
