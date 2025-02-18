import { createAsyncThunk } from "@reduxjs/toolkit";
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
      console.log("Question:", question);
  
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
      console.log("Question:", question);
  
      const res = await axios.delete(
        `https://localhost:7273/api/Quizzes/${question.quizId}`
      );
      return index;
    }
  );