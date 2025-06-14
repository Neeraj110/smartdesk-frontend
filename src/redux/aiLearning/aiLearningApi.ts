import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  LearningGuide,
  CreateAiLearningInput,
  DeleteAiLearningInput,
} from "@/types/types";

const baseUrl = `${import.meta.env.VITE_API_URL}/ai`;
if (!baseUrl) throw new Error("VITE_API_URL is not defined");

export const aiLearningApi = createApi({
  reducerPath: "aiLearningApi",
  tagTypes: ["AiLearning"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createAiLearning: builder.mutation<LearningGuide, CreateAiLearningInput>({
      query: (input) => ({
        url: "/",
        method: "POST",
        body: input,
      }),
      invalidatesTags: ["AiLearning"],
    }),
    getAiLearning: builder.query<LearningGuide[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["AiLearning"],
    }),
    deleteAiLearning: builder.mutation<void, DeleteAiLearningInput>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AiLearning"],
    }),
    getAiLearningById: builder.query<LearningGuide, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["AiLearning"],
    }),
    deleteAiLearningById: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AiLearning"],
    }),
  }),
});

export const {
  useCreateAiLearningMutation,
  useGetAiLearningQuery,
  useDeleteAiLearningMutation,
  useGetAiLearningByIdQuery,
  useDeleteAiLearningByIdMutation,
} = aiLearningApi;
