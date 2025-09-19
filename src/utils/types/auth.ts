import type { User } from "./user";

export interface SignInArgs {
  email: string;
  password: string;
}

export interface SignUpArgs {
  email: string;
  name: string;
  password: string;
}

export interface ChangePasswordArgs {
  password: string;
}

export interface AuthResponse {
  access_token?: string;
  data: User;
}
