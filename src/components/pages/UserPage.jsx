import React from "react";
import { useNavigate } from "react-router-dom";
import { interactiveButton } from "../Styles/styles";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../slices/authslice";

const UserPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const hardcodedUser = {
      username: "juan",
      password: "123",
    };
    //Include DB to store username and password
    if (
      data.username === hardcodedUser.username &&
      data.password === hardcodedUser.password
    ) {
      dispatch(login({ username: data.username }));
      navigate("/examinee");
    } else {
      alert("Wrong username or password, please try again");
    }
  };

  return (
    <>
      <main>
        <div className="grid items-center min-h-screen bg-wizard-bg text-center">
          <header>
            <div className=" grid grid-flow-col items-center justify-center text-white">
              <h1 className="text-5xl font-bold mx-5"> </h1>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-md p-5 shadow-lg"
              >
                <div className="mb-4">
                  <label className=" text-black">Name</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter username here"
                    {...register("username", {
                      required: "Name is required",
                    })}
                    className="text-theme-purple p-2 w-full"
                  />
                  {errors.username && (
                    <span className="text-red-500">
                      {errors.username.message}
                    </span>
                  )}
                </div>
                {/* To change */}
                <div className="mb-5">
                  <label htmlFor="password" className=" text-black ">
                    Code
                  </label>
                  <input
                    id="password"
                    type="text"
                    placeholder="Enter password"
                    {...register("password", {
                      required: "Need game code to play",
                    })}
                    className="text-theme-purple p-2 w-full "
                  />
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <button type="submit" className={interactiveButton}>
                  Play
                </button>
              </form>
            </div>
          </header>
        </div>
      </main>
    </>
  );
};

export default UserPage;
