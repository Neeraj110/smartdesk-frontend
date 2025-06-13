import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  CreateTaskInput,
  UpdateTaskInput,
  DeleteTaskInput,
  Task,
} from "@/types/types";

const baseUrl = `${import.meta.env.VITE_API_URL}/tasks`;
if (!baseUrl) throw new Error("VITE_API_URL is not defined");

export const taskApi = createApi({
  reducerPath: "taskApi",
  tagTypes: ["Task"],
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    createTask: builder.mutation<Task, CreateTaskInput>({
      query: (newTask) => ({
        url: "/",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"],
    }),

    getTasks: builder.query<Task[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    getTaskById: builder.query<Task, string>({
      query: (taskId) => ({
        url: `/${taskId}`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),

    updateTask: builder.mutation<Task, UpdateTaskInput & { taskId: string }>({
      query: ({ taskId, ...updates }) => ({
        url: `/${taskId}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: ["Task"],
    }),

    deleteTask: builder.mutation<Task, DeleteTaskInput & { taskId: string }>({
      query: ({ taskId }) => ({
        url: `/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
