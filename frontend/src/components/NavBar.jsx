import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useNavigate } from "react-router";
import { removeUser } from "../utils/store/userSlice.js";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/user/logout`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(removeUser());
        navigate("/login");
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1 ml-4">
        <a className="btn btn-ghost text-xl">Convo</a>
      </div>
      {user && (
        <div className="flex-none mr-5">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.profilePhoto}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
