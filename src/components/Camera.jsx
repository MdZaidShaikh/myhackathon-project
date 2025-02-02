import React, { useState, useRef, useLayoutEffect } from "react";
import { Button, SHAPE, SIZE } from "baseui/button";
import { FaArrowLeft } from "react-icons/fa";
import { MdCamera } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Camera = () => {
  const [imageData, setImageData] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL("image/png");
      console.log(imageData);
      setImageData(imageData);

      // Stop all video tracks to close the camera
      video.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 h-12 w-full flex items-center">
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
      {imageData ? (
        <img
          src={imageData}
          alt="captured"
          className="w-full object-cover h-screen"
        />
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
    </div>
  );
};

export default Camera;
