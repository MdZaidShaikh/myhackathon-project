import { FaUserAlt } from "react-icons/fa";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { LuMessageSquareDot } from "react-icons/lu";

const Header = () => {
  return (
    <>
      <div className="bg-white text-black w-100 h-16 flex items-center px-4 mt-5 mx-auto">
        {/*User icon */}
        <Link to="/profile">
          <div className="bg-slate-100 w-14 h-14 rounded-full flex justify-center items-center">
            <FaUserAlt />
          </div>
        </Link>
        <div className="flex items-center ml-auto space-x-4">
          {/*Plus icon */}
          <Link to="/camera">
            <div className="bg-slate-100 w-14 h-14 rounded-full flex justify-center items-center">
              <FaPlus />
            </div>
          </Link>
          {/*Message icon */}
          <Link to="/profile">
            <div className="bg-slate-100 w-14 h-14 rounded-full flex justify-center items-center">
              <LuMessageSquareDot />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
