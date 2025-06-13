import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import { userApi } from "./user/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { taskApi } from "./tasks/taskApi";
import { notesApi } from "./notes/notesApi";
import { aiLearningApi } from "./aiLearning/aiLearningApi";

export const store = configureStore({
  reducer: {
    user: userSlice,
    [userApi.reducerPath]: userApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [aiLearningApi.reducerPath]: aiLearningApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(taskApi.middleware)
      .concat(notesApi.middleware)
      .concat(aiLearningApi.middleware),

  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
