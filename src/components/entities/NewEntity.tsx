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
import { useCreateEntityMutation } from "@/store/api/entity";

const newEntitySchema = z.object({
  name: z.string().min(1, "Campo requerido").min(4, "Nombre muy corto"),
  description: z.string(),
});

type NewEntityValues = z.infer<typeof newEntitySchema>;

export default function NewEntity() {
  const toast = useToast();
  const form = useForm<NewEntityValues>({
    resolver: zodResolver(newEntitySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [createEntity] = useCreateEntityMutation();

  const handleNewEntity = useCallback(
    async (data: NewEntityValues) => {
      try {
        await createEntity(data).unwrap();
        form.reset();
      } catch (error) {
        const errorData = error as ErrorResponse;
        toast.error(errorData.data.error, {
          description: errorData.data.message,
          dismissible: true,
          duration: 5000,
          position: "top-right",
        });
      }
    },
    [createEntity, form, toast]
  );

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Crear usuario</h4>
      </div>
      <div className="grid gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleNewEntity)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de la entidad" {...field} />
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
                    <Input placeholder="Descripción de la entidad" {...field} />
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
