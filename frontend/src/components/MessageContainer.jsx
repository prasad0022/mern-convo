import React from "react";
import ChatBubble from "./ChatBubble";
import UserCard from "./UserCard";

const MessageContainer = () => {
  return (
    <div className="block">
      <div className="bg-base-300 rounded-t-md p-3 font-medium">
        <UserCard />
      </div>
      <div className="w-190 h-130 bg-base-200 shadow-xl overflow-x-auto p-3">
        <ChatBubble side={"start"} />
        <ChatBubble side={"end"} />
        <ChatBubble side={"start"} />
        <ChatBubble side={"end"} />
        <ChatBubble side={"end"} />
        <ChatBubble side={"start"} />
        <ChatBubble side={"end"} />
        <ChatBubble side={"start"} />
        <ChatBubble side={"start"} />
        <ChatBubble side={"end"} />
      </div>
    </div>
  );
};

export default MessageContainer;
