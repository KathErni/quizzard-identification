import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const res = await axios.get(`https://localhost:7273/api/Quizzes`);
    return res.data;
  }
);

export const postQuestion = createAsyncThunk(
  "questions/PostQuestions",
  async (question) => {
    const res = await axios.post(
      `https://localhost:7273/api/Quizzes`,
      question
    );
    return res.data;
  }
);

export const putQuestion = createAsyncThunk(
  "questions/PutQuestions",
  async (question) => {
    const res = await axios.put(
      `https://localhost:7273/api/Quizzes/${question.quizId}`,
      question
    );

    return { index: question.index, question };
  }
);

export const deleteQuestions = createAsyncThunk(
  "questions/DeleteQuestion",
  async (index, { getState }) => {
    const { questions } = getState().questions;
    const question = questions[index];
    const res = await axios.delete(
      `https://localhost:7273/api/Quizzes/${question.quizId}`
    );
    return index;
  }
);
const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Fetch/GET
      .addCase(fetchQuestions.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.error = action.error.message;
      })
      //Post/CREATE
      .addCase(postQuestion.pending, (state) => {
        state.error = null;
      })
      .addCase(postQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      })
      .addCase(postQuestion.rejected, (state, action) => {
        state.error = action.error.message;
      })
      //Put/UPDATE
      .addCase(putQuestion.pending, (state) => {
        state.error = null;
      })
      .addCase(putQuestion.fulfilled, (state, action) => {
        const { index, question } = action.payload;
        state.questions[index] = question;
      })
      .addCase(putQuestion.rejected, (state, action) => {
        state.error = action.error.message;
      })
      //Delete
      .addCase(deleteQuestions.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteQuestions.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteQuestions.fulfilled, (state, action) => {
        state.questions.splice(action.payload, 1);
      });
  },
});

export default questionsSlice.reducer;
