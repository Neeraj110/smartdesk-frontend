import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  User,
  LoginInput,
  RegisterInput,
  GoogleLoginInput,
  LogoutResponse,
} from "@/types/types";

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

if (!baseUrl) throw new Error("VITE_API_URL is not defined");

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginInput>({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    register: builder.mutation<User, RegisterInput>({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),

    googleLogin: builder.mutation<User, GoogleLoginInput>({
      query: (code) => ({
        url: "/google-login",
        method: "POST",
        body: { code },
      }),
      invalidatesTags: ["User"],
    }),

    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: "/current-user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: "/update-profile",
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    getStats: builder.query<any, void>({
      query: () => ({
        url: "/stats",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    resetPassword: builder.mutation<void, { email: string; password: string }>({
      query: (value) => ({
        url: "/reset-password",
        method: "Post",
        body: value,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGoogleLoginMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useUpdateUserMutation,
  useGetStatsQuery,
  useResetPasswordMutation,
} = userApi;
