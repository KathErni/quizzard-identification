import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Quizzard_New.png";
import { interactiveButton, titleFont } from "../Styles/styles";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const questions = useSelector((state) => state.questions.questions);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    questions.length === 0 ? setDisableButton(true) : setDisableButton(false);
  }, [questions.length]);

  return (
    <div className="bg-theme-purple min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center text-white mb-8">
          <p className={titleFont}>
            Welcome to Quizzard
          </p>
          <p className="my-3 font-mono text-lg md:text-xl">
            Test your Knowledge and become a Quiz Wizard!
          </p>
        </header>

        <div className="flex flex-col md:flex-row items-center justify-center">
          <img
            src={Logo}
            className="w-48 md:w-64 mb-8 md:mb-0"
            alt="Quizzard Logo"
          />

          <section className="flex flex-col items-center p-3">
            <div className="grid gap-4">
              <p className="text-left text-white font-mono text-lg md:text-xl">
                Select your role below:
              </p>
              <button
                onClick={() => navigate("/teacherlogin")}
                className={interactiveButton}
              >
                Examiner
              </button>

              <button
                onClick={() => navigate("/studentlogin")}
                disabled={disableButton}
                className={interactiveButton}
              >
                Examinee
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
