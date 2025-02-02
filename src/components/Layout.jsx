// withLayout.jsx
import React from "react";
import { Button, SHAPE, SIZE } from "baseui/button";
import { MdOutlineDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdAnalytics } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

function withLayout(WrappedComponent, page) {
  // Return a new component that wraps the original component
  return function LayoutWrapper(props) {
    const dash = page == "Dashboard" ? "black" : "white";
    const dashIcon = page == "Dashboard" ? "white" : "black";
    return (
      <div className="flex flex-col min-h-screen relative bg-slate-100">
        {/* Header Section */}
        <header className="bg-white text-black p-4 w-95 specialDiv flex justify-start mx-auto rounded-2xl mt-3 items-center">
          <FaRegUserCircle className="mr-4 size-8" />
          <h1 className="text-xl font-bold text-left mr-50">Achraf</h1>
          <div className="border rounded-2xl border-slate-400 h-10 w-20 justify-center flex items-center">
            <IoIosNotifications className="size-6 text-slate-700" />
          </div>
        </header>
        {/* Main Content Section */}
        <main className="flex-1 container mx-auto p-4">
          {/* Render the wrapped component and pass it all received props */}
          <WrappedComponent {...props} />
        </main>
        <div className="flex justify-center fixed bottom-4 w-full px-4">
          <div className="bg-white w-70 h-[40px] rounded-3xl flex justify-center items-center specialDiv">
            <a href="/dashboard">
              <div className="flex">
                <Button
                  shape={SHAPE.pill}
                  size={SIZE.large}
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => ({
                        outline: `${$theme.colors.warning600} solid`,
                        backgroundColor: { dash },
                        outline: "none",
                      }),
                    },
                  }}
                >
                  <MdOutlineDashboard color={"black"} />
                </Button>
                <Button
                  shape={SHAPE.pill}
                  size={SIZE.large}
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => ({
                        outline: `${$theme.colors.warning600} solid`,
                        backgroundColor: { dash },
                        outline: "none",
                      }),
                    },
                  }}
                >
                  <CgProfile color={"black"} />
                </Button>
                <Button
                  shape={SHAPE.pill}
                  size={SIZE.large}
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => ({
                        outline: `${$theme.colors.warning600} solid`,
                        backgroundColor: { dash },
                        outline: "none",
                      }),
                    },
                  }}
                >
                  <IoMdAnalytics color={"black"} />
                </Button>
                <Button
                  shape={SHAPE.pill}
                  size={SIZE.large}
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => ({
                        outline: `${$theme.colors.warning600} solid`,
                        backgroundColor: { dash },
                        outline: "none",
                      }),
                    },
                  }}
                >
                  <FaHeart color={"black"} />
                </Button>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  };
}

export default withLayout;
