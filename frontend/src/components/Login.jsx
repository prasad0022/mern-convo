import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/store/userSlice.js";
import { useNavigate } from "react-router";

const Login = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (user) navigate("/");

  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/user/login`,
        { userName, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(addUser(res.data.data));
        navigate("/");
      }
    } catch (error) {
      if (error.status === 400) {
        return setErrorMsg(error.response.data.message);
      } else console.error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/user/signup`, {
        fullName,
        userName,
        password,
        confirmPassword,
        gender,
      });
      if (res.status === 201) {
        // Toast
        alert(res.data.message + "Please login with credentials.");
        setIsLogin(true);
        setUserName("");
        setPassword("");
        setErrorMsg("");
      }
    } catch (error) {
      if (error.status === 400) {
        return setErrorMsg(error.response.data.message);
      } else console.error(error);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-3xl">Login</legend>

        {!isLogin && (
          <>
            <label className="label text-[15px]">Full Name</label>
            <input
              type="text"
              className="input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </>
        )}

        <label className="label text-[15px]">User name</label>
        <input
          type="text"
          className="input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label className="label text-[15px]">Password</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isLogin && (
          <>
            <label className="label text-[15px]">Confirm password</label>
            <input
              type="password"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <label className="label text-[15px]">Gender</label>
            <select
              name="gender"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </>
        )}

        <p className="text-red-600">{errorMsg}</p>

        <button
          className="btn btn-neutral mt-4 w-50 block mx-auto"
          onClick={isLogin ? handleLogin : handleSignUp}
        >
          {isLogin ? "Login" : "Sign up"}
        </button>

        <p
          className="underline m-auto mt-2 cursor-pointer text-neutral-600 hover:text-black"
          onClick={() => {
            setIsLogin((val) => !val);
            setErrorMsg("");
          }}
        >
          {isLogin
            ? "New to Convo? Click here to Sign up."
            : "Already have an account? Click here to Login."}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
