import { ACCESS_TOKEN_KEY } from "@/constants";
import { selectUserSlice, setUserSlice } from "@/store/slices";
import {
  removeFromLocalStorage,
  saveStringToLocalStorage,
} from "@/utils/data-storage/local-storage";
import type { AuthResponse } from "@/utils/types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userState = useSelector(selectUserSlice);

  function isAuthenticated() {
    return userState.isLoggedIn;
  }

  function user() {
    return userState.user;
  }

  const login = useCallback(
    (response: AuthResponse) => {
      dispatch(
        setUserSlice({
          isLoading: false,
          error: "",
          isLoggedIn: true,
          accessToken: response.access_token,
          user: response.data,
        })
      );

      if (response.access_token) {
        saveStringToLocalStorage(ACCESS_TOKEN_KEY, response.access_token!);

        if (response.data.role === "ADMIN") {
          navigate("/admin/dashboard");
          return;
        }

        navigate("/sales");
      } else {
        navigate("/auth/sign-in");
      }
    },
    [dispatch, navigate]
  );

  const logout = useCallback(() => {
    dispatch(
      setUserSlice({
        isLoading: false,
        error: "",
        isLoggedIn: false,
        accessToken: "",
        user: {
          _id: "",
          email: "",
          name: "",
          phone: "",
          role: "USER",
          created_at: "",
          updated_at: "",
        },
      })
    );
    removeFromLocalStorage(ACCESS_TOKEN_KEY);

    navigate("/auth/sign-in");
  }, [dispatch, navigate]);

  return { isAuthenticated, user, login, logout };
}
