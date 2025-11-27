import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 py-2 w-full flex justify-center">
      <p className="">© {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
