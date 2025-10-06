import type {
  ErrorResponse,
  Location,
  SoTrans,
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
import { useCreateSoTransMutation } from "@/store/api/so-trans";

const newSoTransSchema = z.object({
  location: z.string().min(1, "Campo requerido"),
  user: z.string().min(1, "Campo requerido"),
  customer: z.string().min(1, "Campo requerido"),
});

type NewSoTransValues = z.infer<typeof newSoTransSchema>;

export interface NewSoTransProps {
  locations?: Location[];
  users?: User[];
  customers?: Provider[];
  onSoTransCreated?: (soTrans: SoTrans) => void;
}

export default function NewSoTrans({
  locations = [],
  users = [],
  customers = [],
  onSoTransCreated,
}: NewSoTransProps) {
  const toast = useToast();
  const form = useForm<NewSoTransValues>({
    resolver: zodResolver(newSoTransSchema),
    defaultValues: {
      location: locations[0]?._id ?? "",
      user: users[0]?._id ?? "",
      customer: customers[0]?._id ?? "",
    },
  });

  const [createSoTrans] = useCreateSoTransMutation();

  const handleNewSoTrans = useCallback(
    async (data: NewSoTransValues) => {
      try {
        const soTrans = await createSoTrans(data).unwrap();
        form.reset();
        onSoTransCreated?.(soTrans);
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
            description: "Ocurrió un error al crear la orden de venta.",
            dismissible: true,
            duration: 5000,
            position: "top-right",
          });
        }
      }
    },
    [createSoTrans, form, onSoTransCreated, toast]
  );

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Crear orden de venta</h4>
      </div>
      <div className="grid gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleNewSoTrans)}
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
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione un cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {customers?.map((customer, index) => (
                            <SelectItem
                              key={`customer-option-${index}`}
                              value={customer._id!}
                            >
                              {customer.name}
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
