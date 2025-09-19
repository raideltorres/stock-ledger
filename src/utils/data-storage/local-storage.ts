import { ACCESS_TOKEN_KEY } from "@/constants";


type StorageKey = string;

export const getStringFromLocalStorage = (key: StorageKey): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
};

export const saveStringToLocalStorage = (
  key: StorageKey,
  value: string
): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
};

export const getObjectFromLocalStorage = <T = unknown>(
  key: StorageKey
): T | null => {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error(`Error parsing localStorage item for key "${key}":`, error);
    return null;
  }
};

export const saveObjectToLocalStorage = (
  key: StorageKey,
  value: object
): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage for key "${key}":`, error);
  }
};

export const removeFromLocalStorage = (key: StorageKey): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
};

export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};
