import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { LuMessageSquareDot } from "react-icons/lu";
import { Avatar } from "baseui/avatar";

const Header = () => {
  return (
    <>
      <div className="bg-white text-black w-screen h-12 flex items-center px-4 mt-5 max-w-sm mx-auto">
        {/*User icon */}
        <Link to="/profile">
          <Avatar name="User" size="scale1000" />
        </Link>
        <div className="flex items-center ml-auto space-x-4">
          {/*Plus icon */}
          <Link to="/camera">
            <div className="bg-slate-100 w-10 h-10 rounded-full flex justify-center items-center">
              <FaPlus />
            </div>
          </Link>
          {/*Message icon */}
          <Link to="/profile">
            <div className="bg-slate-100 w-10 h-10 rounded-full flex justify-center items-center">
              <LuMessageSquareDot />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
