// withLayout.jsx
import React from "react";
import { useState } from "react";
import { Button, SHAPE, SIZE } from "baseui/button";
import { MdOutlineDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdAnalytics } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { captureImage } from "../utils/CameraCapture";

function withLayout(WrappedComponent, page) {
  // Return a new component that wraps the original component
  return function LayoutWrapper(props) {
    const dash = page == "Dashboard" ? "black" : "white";
    const dashIcon = page == "Dashboard" ? "white" : "black";
    const [capturedImage, setCapturedImage] = useState(null);
    const handleCaptureClick = async () => {
      try {
        // Call the captureImage function and wait for the Promise to resolve
        const imageData = await captureImage();
        // Set the captured image to state so you can use it (e.g., display it in an <img> tag)
        setCapturedImage(imageData);
      } catch (error) {
        console.error("Error capturing image:", error);
      }
    };
    return (
      <div className="flex flex-col min-h-screen relative bg-slate-100 mx-auto">
        {/* Header Section */}
        <div className="bg-white text-black p-3 w-screen specialDiv flex justify-center items-center mx-auto">
          <FaRegUserCircle className="mr-4 size-8" />
          <h1 className="text-xl font-bold text-left mr-30">Achraf</h1>
          <button className="border rounded-full border-white bg-slate-100 w-12 h-12 justify-center flex items-center hover:bg-slate-500">
            <IoIosNotifications className="size-6 text-slate-700" />
          </button>
        </div>
        {/* Main Content Section */}
        <main className="flex-1 container mx-auto p-4">
          {/* Render the wrapped component and pass it all received props */}
          <WrappedComponent {...props} />
        </main>
        <div className="flex justify-center fixed bottom-4 w-full px-4">
          <div className="bg-white w-80 h-[40px] rounded-3xl flex justify-center items-center specialDiv">
            <a href="/dashboard">
              <div className="flex">
                <Button
                  shape={SHAPE.pill}
                  size={SIZE.large}
                  overrides={{
                    BaseButton: {
                      style: ({ $theme }) => ({
                        outline: `${$theme.colors.warning600} solid`,
                        backgroundColor: null,
                        outline: "none",
                      }),
                    },
                  }}
                >
                  <MdOutlineDashboard color={"black"} />
                </Button>
              </div>
            </a>
            <a href="/profile">
              <Button
                shape={SHAPE.pill}
                size={SIZE.large}
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      outline: `${$theme.colors.warning600} solid`,
                      backgroundColor: null,
                      outline: "none",
                    }),
                  },
                }}
              >
                <CgProfile color={"black"} />
              </Button>
            </a>
            {/*Camera Button */}
            <Button
              shape={SHAPE.pill}
              size={SIZE.large}
              onClick={() => {
                handleCaptureClick();
              }}
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => ({
                    outline: `${$theme.colors.warning600} solid`,
                    backgroundColor: null,
                    outline: "none",
                  }),
                },
              }}
            >
              <MdOutlineDocumentScanner className="text-black" />
            </Button>
            <Button
              shape={SHAPE.pill}
              size={SIZE.large}
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => ({
                    outline: `${$theme.colors.warning600} solid`,
                    backgroundColor: null,
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
                    backgroundColor: null,
                    outline: "none",
                  }),
                },
              }}
            >
              <FaHeart color={"black"} />
            </Button>
          </div>
        </div>
      </div>
    );
  };
}

export default withLayout;
