import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchQuestions,
  postQuestion,
  putQuestion,
  deleteQuestions,
} from "../slices/action";

import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authslice";
import { logoutButton } from "../Styles/styles";

const ExaminerPage = () => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.questions);
  const { register, handleSubmit, setValue, reset } = useForm();
  const navigate = useNavigate();
  const [quizId, setQuizId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logout());
      navigate("/");
    } else {
      dispatch(fetchQuestions());
    }
  }, [dispatch, isAuthenticated, navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-theme-purple">
        <p className="text-5xl text-white font-redressed">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-theme-purple">
        <p className="text-2xl text-white font-mono">
          Error: {error}. Please reconnect again.
        </p>
      </div>
    );

  const onSubmit = (data) => {
    if (editIndex !== null) {
      dispatch(
        putQuestion({
          index: editIndex,
          quizId,
          question: data.question,
          answer: data.answer,
        })
      );
      setEditIndex(null);
    } else {
      dispatch(postQuestion({ question: data.question, answer: data.answer }));
    }
    reset();
  };

  const handleEdit = (index) => {
    const questionToEdit = questions[index];
    setValue("question", questionToEdit.question);
    setValue("answer", questionToEdit.answer);
    setEditIndex(index);
    setQuizId(questionToEdit.quizId);

    if (index == null) {
      alert("Question has been updated");
    }
  };

  const handleDelete = (index) => {
    dispatch(deleteQuestions(index));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-theme-purple p-8">
      {isAuthenticated && (
        <div className="w-full flex justify-between items-center p-4 bg-theme-lightpurple text-white fixed top-0 left-0">
          <span className="text-lg font-mono">
            Welcome, teacher <strong>{user.username}</strong>
          </span>
          <button onClick={handleLogout} className={logoutButton}>
            Logout
          </button>
        </div>
      )}

      <div className="border bg-theme-blue bg-opacity-30 p-10 w-full max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-white font-redressed w-full text-center">
          Teacher's Workspace
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4 w-full">
          <input
            type="text"
            placeholder="Enter Question Here"
            {...register("question", { required: true })}
            className="rounded-lg p-2 w-full bg-theme-purple text-white mb-5"
          />

          <input
            type="text"
            placeholder="Set Answer Here"
            {...register("answer", { required: true })}
            className="rounded-lg p-2 w-full bg-theme-purple text-white mb-5"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-theme-orange rounded-2xl text-white p-2 px-10 ml-2 font-bold font-mono"
            >
              {editIndex !== null ? "Update Question" : "Add Question"}
            </button>
            <button
              type="reset"
              className="bg-theme-pink rounded-2xl text-white p-2 px-10 ml-2 font-mono"
              onClick={() => reset()}
            >
              Reset Values
            </button>
          </div>
        </form>
      </div>

      <div className="w-full p-10 max-w-4xl mx-auto">
        {questions.map((q, index) => (
          <div
            key={index}
            className="mb-2 flex flex-col md:flex-row text-theme-dark items-center space-x-3"
          >
            <div className="flex-grow border p-5 bg-white rounded-lg mb-4 md:mb-0">
              <p className="font-bold">{q.question}</p>
              <p>Answer: {q.answer}</p>
              <div className="flex-shrink-0 flex space-x-5 justify-end">
                <button
                  onClick={() => {
                    handleEdit(index);
                    setQuizId(q.quizId);
                  }}
                  className="bg-theme-orange text-white py-1 px-2 font-mono"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-theme-pink text-white py-1 px-2 font-mono"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExaminerPage;
