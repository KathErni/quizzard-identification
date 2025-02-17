import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const res = await axios.get("https://localhost:7273/api/Quizzes");
    console.log("Api:", res.data);
    return res.data;
  }
);

export const postQuestion = createAsyncThunk(
  "questions/PostQuestions",
  async (question) => {
    const res = await axios.post(
      "https://localhost:7273/api/Quizzes",
      question
    );
    return res.data;
  }
);

export const putQuestion = createAsyncThunk(
  "questions/PostQuestions",
  async (index, question) => {
    const res = await axios.put(
      "https://localhost:7273/api/Quizzes/{id}",
      question
    );
    return { index, question: res.data };
  }
);

// const initialState = {
//   questions: {
//     uestions: [],
//     loading: false,
//     error: null,
//   },
// };

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  reducers: {
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    deleteQuestion: (state, action) => {
      state.questions.splice(action.payload, 1);
    },
    updateQuestion: (state, action) => {
      const { index, newQuestion } = action.payload;
      state.questions[index] = newQuestion;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questions.push(action.payload);
      })
      .addCase(postQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(putQuestion.fulfilled, (state) => {
        state.loading = false;
        const { index, question } = action.payload;
        state.questions[index] = question;
      })
      .addCase(putQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(putQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { addQuestion, deleteQuestion, updateQuestion } =
  questionsSlice.actions;
export default questionsSlice.reducer;
