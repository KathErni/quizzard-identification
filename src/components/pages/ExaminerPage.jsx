import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  addQuestion,
  deleteQuestion,
  fetchQuestions,
  updateQuestion,
  postQuestion,
  //add put question
} from "../slices/questionslice";

import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authslice";
import { logoutButton } from "../Styles/styles";

const ExaminerPage = () => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.questions);
  console.log("Questions from Redux: ", questions);
  const { register, handleSubmit, setValue, reset } = useForm();
  const navigate = useNavigate();
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

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error}</p>;

  const onSubmit = (data) => {
    if (editIndex !== null) {
      dispatch(
        updateQuestion({
          index: editIndex,
          newQuestion: { question: data.question, answer: data.answer },
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
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  console.log("Questions in ExaminerPage:", questions);

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

      <div className="border bg-theme-blue bg-opacity-30 p-10">
        <h1 className=" text-5xl font-bold mb-4 text-white font-redressed w-full">
          Teacher's Workspace
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <input
            type="text"
            placeholder="Enter Question Here"
            {...register("question", { required: true })}
            className="rounded-lg p-10 w-full bg-theme-purple text-white mb-5"
          />

          <input
            type="text"
            placeholder="Set Answer Here"
            {...register("answer", { required: true })}
            className="rounded-lg p-10 border p-2"
          />
          <button
            type="submit"
            className="bg-theme-orange rounded-2xl text-white p-2 px-10 px-4 ml-2"
          >
            {editIndex !== null ? "Update Question" : "Add Question"}
          </button>
          <button
            type="reset"
            className="bg-theme-pink rounded-2xl text-white p-2 px-10 px-4 ml-2"
          >
            Reset Values
          </button>
        </form>
      </div>

      <div className="w-full p-10">
        {questions.map((q, index) => (
          <div key={index} className="mb-2 flex text-theme-dark items-center">
            <div className="flex-grow border p-5 bg-white rounded-lg">
              <p className="font-bold ">{q.question} </p>
              <p> Answer: {q.answer}</p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => handleEdit(index)}
                className="bg-yellow-500 text-white py-1 px-2 ml-2"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteQuestion(index))}
                className="bg-red-500 text-white py-1 px-2 ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* <footer>
      Need help?
    </footer> */}
    </div>
  );
};

export default ExaminerPage;
