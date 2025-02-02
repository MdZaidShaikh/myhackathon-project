import { Button, SHAPE, SIZE } from "baseui/button";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { MdOutlineDashboard, MdOutlineDocumentScanner } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);

  return (
    <div className="flex justify-center fixed bottom-2 w-full">
      <div className="bg-slate-50 rounded-3xl flex justify-center items-center shadow-lg my-shadow">
        <Link to="/dashboard">
          <div className="flex">
            <Button
              shape={SHAPE.pill}
              size={SIZE.large}
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => ({
                    outline: "none !important",
                    backgroundColor: null,
                  }),
                },
              }}
            >
              <MdOutlineDashboard
                className={
                  pathname === "/dashboard" ? "text-green-400" : "text-black"
                }
                size={30}
              />
            </Button>
          </div>
        </Link>
        <Link to="/profile">
          <Button
            shape={SHAPE.pill}
            size={SIZE.large}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  outline: "none !important",
                  backgroundColor: null,
                }),
              },
            }}
          >
            <CgProfile
              className={
                pathname === "/profile" ? "text-green-400" : "text-black"
              }
              size={30}
            />
          </Button>
        </Link>
        <Link to="/camera">
          <Button
            shape={SHAPE.pill}
            size={SIZE.large}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  outline: "none !important",
                  backgroundColor: null,
                }),
              },
            }}
          >
            <MdOutlineDocumentScanner className="text-black" size={30} />
          </Button>
        </Link>
        <Link to="/analytics">
          <Button
            shape={SHAPE.pill}
            size={SIZE.large}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  outline: "none",
                  backgroundColor: null,
                }),
              },
            }}
          >
            <IoMdAnalytics
              className={
                pathname === "/analytics" ? "text-green-400" : "text-black"
              }
              size={30}
            />
          </Button>
        </Link>
        <Link to="/preferences">
          <Button
            shape={SHAPE.pill}
            size={SIZE.large}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  outline: "none !important",
                  backgroundColor: null,
                }),
              },
            }}
          >
            <FaHeart
              className={
                pathname === "/prefernces" ? "text-green-400" : "text-black"
              }
              size={30}
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
