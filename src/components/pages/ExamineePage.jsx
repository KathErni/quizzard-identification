import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ModalScore from "../pages/ModalScore";

import { logout } from "../slices/authslice";
import { interactiveButton, logoutButton } from "../Styles/styles";

const ExamineePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.questions);
  const { register, handleSubmit, reset } = useForm();
  const [score, setScore] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logout());
      navigate("/");
    }
  });
  const onSubmit = (data) => {
    let newScore = 0;
    questions.forEach((q, index) => {
      if (
        data[`answer${index}`] &&
        data[`answer${index}`].toLowerCase().trim() === q.answer.toLowerCase()
      ) {
        newScore++;
      }
    });
    setScore(newScore);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const resetScore = () => {
    setScore(null);
  };

  const closeModal = () => {
    setScore(null);
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-theme-purple p-8">
      {isAuthenticated && (
        <div className="w-full flex justify-between items-center p-4 bg-theme-lightpurple text-white fixed top-0 left-0">
          <span className="text-lg">Welcome, {user.username}</span>
          <button onClick={handleLogout} className={logoutButton}>
            Logout
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md sm:max-w-lg overflow-hidden"
      >
        <h2 className="text-xl text-white font-mono text-left mb-4">
          Identification: Fill in the blanks with the correct answers.
        </h2>
        {questions.map((q, index) => (
          <div key={index} className="mb-4 bg-white shadow-md rounded p-4">
            <span className="text-theme-dark block mb-2">{q.question}</span>
            <input
              type="text"
              {...register(`answer${index}`, { required: true })}
              onChange={resetScore}
              className="border p-2 w-full"
            />
          </div>
        ))}

        <div className="flex flex-col items-center justify-center bg-theme-lightest">
          <button type="submit" className={interactiveButton}>
            Submit
          </button>
        </div>
      </form>

      {score !== null && (
        <ModalScore
          score={score}
          totalQuestions={questions.length}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default ExamineePage;
