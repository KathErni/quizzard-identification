import React from "react";
import { interactiveButton } from "../Styles/styles";

const ModalScore = ({ score, closeModal, totalQuestions }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center  text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg bg-gray-50 px-5 py-4">
          <h2
                className="text-lg font-bold text-theme-purple text-center"
                id="modal-title"
              >
                Your Score
              </h2>
              
              <p className="text-md text-gray-700 text-center">
                You scored {score} out of {totalQuestions}.
              </p>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 ">
              <button
                type="button"
                className={interactiveButton}
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalScore;
