import type {
  ErrorResponse,
  Location,
  PoTrans,
  Provider,
  User,
} from "@/utils/types";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreatePoTransMutation } from "@/store/api/po-trans";

const newPoTransSchema = z.object({
  location: z.string().min(1, "Campo requerido"),
  user: z.string().min(1, "Campo requerido"),
  provider: z.string().min(1, "Campo requerido"),
});

type NewPoTransValues = z.infer<typeof newPoTransSchema>;

export interface NewPoTransProps {
  locations?: Location[];
  users?: User[];
  providers?: Provider[];
  onPoTransCreated?: (poTrans: PoTrans) => void;
}

export default function NewPoTrans({
  locations = [],
  users = [],
  providers = [],
  onPoTransCreated,
}: NewPoTransProps) {
  const toast = useToast();
  const form = useForm<NewPoTransValues>({
    resolver: zodResolver(newPoTransSchema),
    defaultValues: {
      location: locations[0]?._id ?? "",
      user: users[0]?._id ?? "",
      provider: providers[0]?._id ?? "",
    },
  });

  const [createPoTrans] = useCreatePoTransMutation();

  const handleNewPoTrans = useCallback(
    async (data: NewPoTransValues) => {
      try {
        const poTrans = await createPoTrans(data).unwrap();
        form.reset();
        onPoTransCreated?.(poTrans);
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
            description: "Ocurrió un error al crear la orden de compra.",
            dismissible: true,
            duration: 5000,
            position: "top-right",
          });
        }
      }
    },
    [createPoTrans, form, onPoTransCreated, toast]
  );

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Crear orden de compra</h4>
      </div>
      <div className="grid gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleNewPoTrans)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localidad</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione una localidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {locations?.map((location, index) => (
                            <SelectItem
                              key={`location-option-${index}`}
                              value={location._id!}
                            >
                              {location.name}
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
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operador</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione un operador" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {users?.map((user, index) => (
                            <SelectItem
                              key={`user-option-${index}`}
                              value={user._id!}
                            >
                              {user.name}
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
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proveedor</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione un proveedor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {providers?.map((provider, index) => (
                            <SelectItem
                              key={`provider-option-${index}`}
                              value={provider._id!}
                            >
                              {provider.name}
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

            <Button type="submit" className="w-full">
              Crear
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
