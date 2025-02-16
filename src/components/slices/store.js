import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from '../slices/questionslice';
import authReducer from "./authslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionsReducer,
  },
  //Reducer - reducer checks, action will be called, then modifies the store
  //Dispatch - execute the action
});
