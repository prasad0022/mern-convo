import React from "react";
import SideBar from "./SideBar";
import MessageContainer from "./MessageContainer";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center mt-5">
      <div className="inline-flex gap-9">
        <SideBar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default HomePage;
