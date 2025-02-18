import { createSlice } from "@reduxjs/toolkit";
import {
  fetchQuestions,
  postQuestion,
  putQuestion,
  deleteQuestions,
} from "./action";

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  reducers: {
    //Front End set only
    // addQuestion: (state, action) => {
    //   state.questions.push(action.payload);
    // },
    // deleteQuestion: (state, action) => {
    //   state.questions.splice(action.payload, 1);
    // },
    // updateQuestion: (state, action) => {
    //   // console.log("Action: ", action);
    //   // const { index, newQuestion } = action.payload;
    //   // state.questions[index] = newQuestion;
    // },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchQuestions.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // .addCase(postQuestion.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(postQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questions.push(action.payload);
      })
      .addCase(postQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // .addCase(putQuestion.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(putQuestion.fulfilled, (state, action) => {
        state.loading = false;
        const { index, question } = action.payload;
        console.log("Action: ", action);
        state.questions[index] = question;
      })
      .addCase(putQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     .addCase(deleteQuestions.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Action: ", action);
        state.questions.splice(action.payload, 1);
      });
     
     
  },
});

export const { addQuestion, deleteQuestion, updateQuestion } =
  questionsSlice.actions;
export default questionsSlice.reducer;
