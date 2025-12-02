import React from "react";
import UserCard from "./UserCard";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const SideBar = () => {
  useGetOtherUsers();
  const friends = useSelector((store) => store.friends);
  return (
    <div className="block">
      <div className="bg-base-300 rounded-t-md p-3">
        <p className="text-[16px] font-medium ml-2">Chats</p>
      </div>
      <div className="w-80 h-130 overflow-x-auto">
        <div className="list bg-base-200 shadow-xl">
          {friends?.map((friend) => (
            <UserCard key={friend?._id} friend={friend} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
