import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Quizzard_New.png";
import { interactiveButton, center } from "../Styles/styles";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-theme-purple min-h-screen">
      <div className=" grid mx-40">
      <header className=" grid p-3 text-center text-white">
          <p className="text-6xl font-redressed ">Welcome to Quizzard</p>
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
