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
import { useSignInMutation } from "@/store/api/auth";
import { useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

import type { AuthResponse, ErrorResponse } from "@/utils/types";
import { AuthChangePage } from "@/components/common/AuthChangePage";

const loginSchema = z.object({
  email: z.string().min(1, "Campo requerido").email("Correo no válido"),
  password: z
    .string()
    .min(1, "Campo requerido")
    .min(6, "Mínimo 6 caracteres"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function SignIn() {
  const { login } = useAuth();
  const toast = useToast();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [signIn] = useSignInMutation();

  const handleSignIn = useCallback(
    async (data: LoginValues) => {
      try {
        const signInResult = (await signIn(data).unwrap()) as AuthResponse;

        login(signInResult);
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
            description: "Ocurrió un error al iniciar sesión.",
            dismissible: true,
            duration: 5000,
            position: "top-right",
          });
        }
      }
    },
    [login, signIn, toast]
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Iniciar sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className="space-y-6"
          >
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
              Entrar
            </Button>

            <AuthChangePage
              text={"¿No tienes una cuenta?"}
              linkTextText={"Solicita una cuenta"}
              linkTextHref={`/auth/sign-up`}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
