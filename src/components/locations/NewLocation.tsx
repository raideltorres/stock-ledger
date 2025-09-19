import type { Entity, ErrorResponse } from "@/utils/types";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateLocationMutation } from "@/store/api/location";

const newEntitySchema = z.object({
  entity: z.string().min(1, "Campo requerido"),
  type: z.enum(["WAREHOUSE", "SALES_FLOOR"]),
  name: z.string().min(1, "Campo requerido").min(4, "Nombre muy corto"),
  description: z.string(),
});

type NewLocationValues = z.infer<typeof newEntitySchema>;

export interface NewLocationProps {
  entities?: Entity[];
}

export default function NewLocation({ entities = [] }: NewLocationProps) {
  const toast = useToast();
  const form = useForm<NewLocationValues>({
    resolver: zodResolver(newEntitySchema),
    defaultValues: {
      entity: entities[0]._id ?? "",
      type: "SALES_FLOOR",
      name: "",
      description: "",
    },
  });

  const [createLocation] = useCreateLocationMutation();

  const handleNewLocation = useCallback(
    async (data: NewLocationValues) => {
      try {
        await createLocation(data).unwrap();
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
    [createLocation, form, toast]
  );

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Crear usuario</h4>
      </div>
      <div className="grid gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleNewLocation)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="entity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entidad</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione una entidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {entities?.map((entity, index) => (
                            <SelectItem
                              key={`entity-option-${index}`}
                              value={entity._id!}
                            >
                              {entity.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de localidad</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="WAREHOUSE">Almacén</SelectItem>
                          <SelectItem value="SALES_FLOOR">
                            Piso de venta
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                    <Input placeholder="Nombre de la localidad" {...field} />
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
                    <Input
                      placeholder="Descripción de la localidad"
                      {...field}
                    />
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
