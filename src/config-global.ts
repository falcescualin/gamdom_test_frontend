/// <reference types="vite/client" />

export const HOST_API = import.meta.env.VITE_HOST_API;
export const API_VERSION = import.meta.env.VITE_API_VERSION;
export const ENV = import.meta.env.MODE || "development";

export const DEAFULT_USER = {
  email: import.meta.env.VITE_DEFAULT_USER_EMAIL,
  password: import.meta.env.VITE_DEFAULT_USER_PASSWORD,
};

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = "/dashboard";
