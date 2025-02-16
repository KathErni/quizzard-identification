import React from "react";
import { useNavigate } from "react-router-dom";
import { interactiveButton } from "../Styles/styles";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../slices/authslice";

const LoginPageAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const hardcodedUser = {
      username: "admin",
      password: "123",
    };
    //Include DB to store username and password
    if (
      data.username === hardcodedUser.username &&
      data.password === hardcodedUser.password
    ) {
      dispatch(login({ username: data.username }));
      navigate("/examiner");
    } else {
      alert("Wrong username or password, please try again");
    }
  };

  return (
    <>
      <main>
        <div className="grid items-center min-h-screen bg-theme-purple">
          <header>
            <div className=" grid grid-flow-col items-center justify-center text-white">
              <h1 className="text-5xl font-bold mx-5">Login </h1>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-md p-5 shadow-lg"
              >
                <div className="mb-4">
                  <label className=" text-black">Username</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter username here"
                    {...register("username", {
                      required: "Username is required",
                    })}
                    className="text-theme-purple p-2 w-full"
                  />
                  {errors.username && (
                    <span className="text-red-500">
                      {errors.username.message}
                    </span>
                  )}
                </div>
                <div className="mb-5">
                  <label htmlFor="password" className=" text-black ">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    {...register("password", {
                      required: "Password is required",
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
                  Login
                </button>
              </form>
            </div>
          </header>
        </div>
      </main>
    </>
  );
};

export default LoginPageAdmin;
