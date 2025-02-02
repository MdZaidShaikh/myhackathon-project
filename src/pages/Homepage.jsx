import React from "react";
import Button from "../components/BaseButton";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMailOutline } from "react-icons/md";

export default function Homepage() {
  const login = "none";
  const isClicked = false;
  return (
    <div className="max-w-sm mx-auto h-screen">
      <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20 pt-25">
        <div className="items-center text-base justify-between gap-4 mx-auto w-120 max-w-full my-4 px-4 py-2 rounded-xl specialDiv overflow-hidden white h-120">
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
            {isClicked ? null : (
              <>
                <Button
                  text={"Google"}
                  className={"hover:bg-slate-300"}
                ></Button>
                <Button text={"E-mail"}></Button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
