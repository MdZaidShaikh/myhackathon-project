import React, { useState, useRef, useLayoutEffect } from "react";
import { Button, SHAPE, SIZE } from "baseui/button";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import { MdCamera } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ANCHOR, Drawer } from "baseui/drawer";
import ReceiptForm from "../components/Receipt";

const Camera = () => {
  const [imageData, setImageData] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: "environment" // This specifies the back camera
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing the camera: ", error);
    }
  };
  const navigate = useNavigate();

  useLayoutEffect(() => {
    startCamera();
  }, []);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleProcessImage = (imageData) => {
    // Process the image data here
    console.log("Processing image data: ", imageData);

    setTimeout(() => {
      setIsOpen(true);
      setImageData(null);
    }, 2000);
  };
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL("image/png");
      setImageData(imageData);
      handleProcessImage(imageData);
      // Stop all video tracks to close the camera
      video.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div className="relative max-w-sm mx-auto">
      {!imageData && !isOpen && (
        <div className="absolute top-0 left-0 h-12 w-full flex items-center z-[100]">
          <Button
            shape={SHAPE.pill}
            size={SIZE.large}
            onClick={() => navigate(-1)}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  outline: "none !important",
                  backgroundColor: null,
                }),
              },
            }}
          >
            <FaArrowLeft />
          </Button>
        </div>
      )}
      {imageData ? (
        <div className="relative  h-screen">
          <div className="absolute top-0 bottom-0 h-full w-full flex justify-center items-end bg-black/50 z-[15] text-white">
            <h5 className="pb-10 font-bold items-center flex gap-x-3">
              <FaSpinner className="animate animate-spin" />
              Processing
            </h5>
          </div>
          <img
            src={imageData}
            alt="captured"
            className="absolute top-0 bottom-0 h-full w-full z-[10] object-cover"
          />
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            style={{
              width: "100%",
              objectFit: "cover",
              height: "100vh",
            }}
          />
          <div className="flex justify-center w-full">
            <button
              onClick={captureImage}
              className="absolute bottom-8 mx-auto bg-black/60 p-2 text-center w-16 h-16 rounded-full flex justify-center items-center"
            >
              <MdCamera size={30} color="white" />
            </button>
          </div>
        </>
      )}
      <canvas ref={canvasRef} className="hidden" />
      <Drawer
        anchor={ANCHOR.bottom}
        isOpen={isOpen}
        autoFocus
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <ReceiptForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          initialData={{
            image: imageData,
            storeName: "Walmart",
            date: new Date(),
            items: [
              {
                name: "Apples",
                price: 2.99,
                quantity: 1,
              },
              {
                name: "Bananas",
                price: 1.99,
                quantity: 2,
              },
            ],
            total: 6.97,
          }}
        />
      </Drawer>
    </div>
  );
};

export default Camera;
