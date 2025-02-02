import React from "react";
import Button from "../components/BaseButton";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMailOutline } from "react-icons/md";
import { useState } from "react";

export default function Homepage() {
  const login = "none";
  return (
    <div className="max-w-sm mx-auto h-screen">
      <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20 pt-25">
        <div className="items-center text-base justify-between gap-4 mx-auto w-120 max-w-full my-4 px-4 py-2 rounded-xl overflow-hidden white h-120">
          <h1 className="font-semibold text-4xl pt-7 ">
            Smart<span className="text-green-400 bold">Spend</span>
          </h1>
          <p className="text-left pl-10 pt-12 text-2xl">
            Track, Save, and Grow,
          </p>
          <p className="text-left pl-10 text-2xl mb-10">
            Your <span className="text-green-400">Money</span>.
          </p>
          <div className="flex flex-col items-center">
            <Button text={"Google"}></Button>
            <hr className="border-t-1 border-slate-400 w-70 mt-7" />
            <Button text="email"></Button>
            <input
              className="pr-3 pl-5 w-75 mt-6 rounded-lg bg-slate-100 h-7"
              placeholder="name@email.com"
            ></input>
            <button className="border border-solid border-green-400 border- rounded-lg mt-2 w-18 h-8 hover:text-green-400 duration-200">
              {" "}
              Sign In
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
