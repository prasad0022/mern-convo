import React from "react";
import UserCard from "./UserCard";

const SideBar = () => {
  return (
    <div className="block">
      <div className="bg-base-300 rounded-t-md p-3">
        <p className="text-[16px] font-medium ml-2">Chats</p>
      </div>
      <div className="w-80 h-130 overflow-x-auto">
        <div className="list bg-base-200 shadow-xl">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
