import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Note,
  CreateNoteInput,
  UpdateNoteInput,
  DeleteNoteInput,
} from "@/types/types";

const baseUrl = import.meta.env.VITE_API_URL;
if (!baseUrl) throw new Error("VITE_API_URL is not defined");

export const notesApi = createApi({
  reducerPath: "notesApi",
  tagTypes: ["Note"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createNote: builder.mutation<Note, CreateNoteInput>({
      query: ({ title, text, file, summaryLength }) => {
        const formData = new FormData();
        formData.append("title", title);
        if (text) formData.append("text", text);
        if (file) formData.append("originalNote", file);
        if (summaryLength) formData.append("summaryLength", summaryLength);
        return {
          url: "/notes",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Note"],
    }),
    getNotes: builder.query<Note[], void>({
      query: () => ({
        url: "/notes",
        method: "GET",
      }),
      providesTags: ["Note"],
    }),
    updateNote: builder.mutation<Note, UpdateNoteInput>({
      query: ({ id, title, text, file, summaryLength }) => {
        const formData = new FormData();
        formData.append("title", title);
        if (text) formData.append("text", text);
        if (file) formData.append("originalNote", file);
        if (summaryLength) formData.append("summaryLength", summaryLength);
        return {
          url: `/notes/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Note"],
    }),
    deleteNote: builder.mutation<void, DeleteNoteInput>({
      query: ({ id }) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note"],
    }),
  }),
});

export const {
  useCreateNoteMutation,
  useGetNotesQuery,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
