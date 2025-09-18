import type { Identifiable, Role } from "./common";

export interface User extends Identifiable {
  email?: string;
  name?: string;
  avatar?: string;
  role?: Role;
  created_at?: string;
  updated_at?: string;
}

export interface UserState {
  isLoading: boolean;
  error: string;
  isLoggedIn: boolean;
  accessToken: string;
  user: User;
}
