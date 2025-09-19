import type { User } from "@/utils/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCallback } from "react";
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

const changePasswordSchema = z.object({
  password: z
    .string()
    .nonempty("Campo requerido")
    .min(6, "Mínimo 6 caracteres"),
});

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

export interface UserChangePasswordProps {
  onChange?: (partial: User) => void;
}

export default function UserChangePassword({
  onChange,
}: UserChangePasswordProps) {
  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleChangePassword = useCallback(
    async (partial: ChangePasswordValues) => {
      onChange?.(partial);
      form.reset();
    },
    [form, onChange]
  );

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="leading-none font-medium">Cambiar contraseña</h4>
      </div>
      <div className="grid gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleChangePassword)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Cambiar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
