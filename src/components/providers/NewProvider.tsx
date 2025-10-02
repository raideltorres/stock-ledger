import type { ErrorResponse } from "@/utils/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCallback } from "react";
import { useToast } from "@/hooks/useToast";
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
import { useCreateProviderMutation } from "@/store/api/providers";

const newProviderSchema = z.object({
  name: z.string().min(1, "Campo requerido").min(2, "Nombre muy corto"),
  email: z.string().email("Correo no válido"),
  description: z.string(),
});

type NewProviderValues = z.infer<typeof newProviderSchema>;

export default function NewProvider() {
  const toast = useToast();
  const form = useForm<NewProviderValues>({
    resolver: zodResolver(newProviderSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
  });

  const [createProvider] = useCreateProviderMutation();

  const handleNewProvider = useCallback(
    async (data: NewProviderValues) => {
      try {
        await createProvider(data).unwrap();
        form.reset();
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
            description: "Ocurrió un error al crear el proveedor.",
            dismissible: true,
            duration: 5000,
            position: "top-right",
          });
        }
      }
    },
    [createProvider, form, toast]
  );

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Crear proveedor</h4>
      </div>
      <div className="grid gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleNewProvider)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="correo@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Descripción" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Crear
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
