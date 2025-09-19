import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { useSignUpMutation } from "@/store/api/auth";
import { AuthChangePage } from "@/components/common/AuthChangePage";
import type { AuthResponse, ErrorResponse } from "@/utils/types";

const registerSchema = z.object({
  name: z.string().nonempty("Campo requerido").min(2, "Nombre muy corto"),
  email: z.string().nonempty("Campo requerido").email("Correo no válido"),
  password: z
    .string()
    .nonempty("Campo requerido")
    .min(6, "Mínimo 6 caracteres"),
});

type RegisterValues = z.infer<typeof registerSchema>;

export function SignUp() {
  const { login } = useAuth();
  const toast = useToast();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [signUp] = useSignUpMutation();

  const handleSignUp = useCallback(
    async (data: RegisterValues) => {
      try {
        const signUpResult = (await signUp(data).unwrap()) as AuthResponse;

        login(signUpResult);
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
    [login, signUp, toast]
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Crear cuenta</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignUp)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre completo" {...field} />
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
                    <Input placeholder="tucorreo@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
            >
              Registrarse
            </Button>

            <AuthChangePage
              text={"¿Ya tienes una cuenta?"}
              linkTextText={"Inicia sesión"}
              linkTextHref={`/auth/sign-in`}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
