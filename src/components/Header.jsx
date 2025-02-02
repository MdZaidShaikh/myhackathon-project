import { FaRegUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import React from "react";

const Header = () => {
  return (
    <div className="bg-white text-black p-3 w-screen flex justify-center items-center mx-auto">
      <FaRegUserCircle className="mr-4 size-8" />
      <h1 className="text-xl font-bold text-left mr-30">Achraf</h1>
      <button className="border rounded-full border-white bg-slate-100 w-12 h-12 justify-center flex items-center hover:bg-slate-500">
        <IoIosNotifications className="size-6 text-slate-700" />
      </button>
    </div>
  );
};

export default Header;
