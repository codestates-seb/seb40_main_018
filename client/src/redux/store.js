import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "./comment";
export const store = configureStore({
  reducer: {
    comment: commentReducer,
  },
});
