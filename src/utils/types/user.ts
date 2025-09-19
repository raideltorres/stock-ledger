import type { Identifiable, Role, UserStatus } from "./common";

export interface User extends Identifiable {
  email?: string;
  name?: string;
  avatar?: string;
  password?: string;
  role?: Role;
  status?: UserStatus;
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
