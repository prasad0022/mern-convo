import React from "react";

const UserCard = ({ friend }) => {
  return (
    <div className="list-row flex items-center gap-4">
      <img className="size-10 rounded-box" src={friend?.profilePhoto} />
      <p className="text-[15px]">{friend?.fullName}</p>
    </div>
  );
};

export default UserCard;
