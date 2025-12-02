/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { addFriends } from "../utils/store/friendsSlice.js";

const useGetOtherUsers = () => {
  const friends = useSelector((store) => store.friends);
  const dispatch = useDispatch();

  useEffect(() => {
    if (friends) return;

    const fetchOtherUsers = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}/user/getOtherUsers`,
          {},
          { withCredentials: true }
        );
        if (res.status === 200) {
          dispatch(addFriends(res.data.data));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOtherUsers();
  }, []);
};

export default useGetOtherUsers;
