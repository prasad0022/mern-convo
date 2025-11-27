import React from "react";

const UserCard = () => {
  return (
    <div className="list-row flex items-center gap-4">
      <img
        className="size-10 rounded-box"
        src="https://img.daisyui.com/images/profile/demo/1@94.webp"
      />
      <p className="text-[15px]">John Kelvin</p>
    </div>
  );
};

export default UserCard;
