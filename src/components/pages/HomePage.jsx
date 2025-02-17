import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Quizzard_New.png";
import { interactiveButton, center } from "../Styles/styles";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const questions = useSelector((state) => state.questions.questions);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    questions.length === 0 ? setDisableButton(true) : setDisableButton(false);
  });

  return (
    <div className="bg-theme-purple min-h-screen">
      <div className=" grid mx-40">
        <header className=" grid p-3 text-center text-white">
          <p className="text-6xl font-redressed m-5">Welcome to Quizzard</p>
          <p className="my-3 font-mono">
            Test your Knownledge and become a Quiz Wizard{" "}
          </p>
        </header>

        <div className=" grid grid-flow-col">
          <img src={Logo} className={center}></img>

          <section className=" grid items-center p-3">
            <div className="grid">
              <p className=" text-left text-white font-mono">
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
