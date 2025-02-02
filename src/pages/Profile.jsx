import React from "react";
import withLayout from "../components/Layout";
import { FaRegUserCircle } from "react-icons/fa";

function Profile() {
  const name = "Achraf";
  const pfp = null;
  const data1 = "parag1";
  const data2 = "parag2";
  const data3 = "parag3";
  const data4 = "parag4";
  const points = 69;
  const spent = 1000.0;
  return (
    <>
      <div className="flex flex-col bg-white w-90 h-120 mx-auto border-slate-400 rounded-2xl pt-8 ">
        <p className="text-right text-xs pr-5">Spent this week :</p>
        <div className="items-left pl-10">
          <div className="flex items-center">
            {pfp ? (
              <img src="pfp" className="size-13 rounded-4xl text-right"></img>
            ) : (
              <FaRegUserCircle className="size-13 text-right"></FaRegUserCircle>
            )}
            <p className="ml-35 text-3xl mt-5">
              $<span className="text-green-400">{spent.toFixed(1)}</span>
            </p>
          </div>
          <p className="capitalize">{name}</p>
        </div>
        <div className=" flex flex-col items-left justify-center mx-auto">
          <hr className="border-t-1 border-slate-800 w-75 my-4" />
          <p className="mt-1">{data1}</p>
          <p className="mt-8">{data2}</p>
          <hr className="border-t-1 border-slate-800 w-75 my-4" />
          <p className="mt-1">{data3}</p>
          <p className="mt-8">{data4}</p>
          <hr className="border-t-1 border-slate-800 w-75 my-4" />
          <p className=" text-2xl">
            Point balance : <span className="text-green-400">{points} </span>
          </p>
        </div>
        <></>
      </div>
    </>
  );
}

export default withLayout(Profile, "Profile");
