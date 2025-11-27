/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "./utils/constants.js";
import { addUser } from "./utils/store/userSlice.js";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user) return;
        const res = await axios.get(`${BASE_URL}/user/profile`, {
          withCredentials: true,
        });
        dispatch(addUser(res.data.data));
      } catch (error) {
        if (error.status === 401) return navigate("/login");
        else console.error(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
