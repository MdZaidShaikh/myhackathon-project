/**
 * Opens the camera, displays a live video feed, and waits for the user to capture an image.
 * When the user clicks the "Capture Image" button, it captures the current frame,
 * stops the camera, removes the temporary elements from the DOM, and resolves with
 * the captured image as a Base64-encoded PNG string.
 *
 * @returns {Promise<string>} A promise that resolves to the captured image data URL.
 */
export function captureImage() {
  return new Promise(async (resolve, reject) => {
    let stream = null;
    try {
      // Request access to the user's camera
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
    } catch (error) {
      reject("Error accessing the camera: " + error);
      return;
    }

    // Create and configure the video element
    const video = document.createElement("video");
    video.style.width = "400px";
    video.style.border = "1px solid #ccc";
    video.autoplay = true;
    video.srcObject = stream;
    document.body.appendChild(video);

    // Create the capture button
    const captureButton = document.createElement("button");
    captureButton.textContent = "Capture Image";
    captureButton.style.display = "block";
    captureButton.style.marginTop = "10px";
    document.body.appendChild(captureButton);

    // Create an event listener for the capture button
    captureButton.addEventListener("click", () => {
      // Create a canvas to draw the current video frame
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the Base64 encoded image data from the canvas
      const imageData = canvas.toDataURL("image/png");

      // Stop all video tracks to close the camera
      stream.getTracks().forEach((track) => track.stop());

      // Clean up the elements we added to the DOM
      document.body.removeChild(video);
      document.body.removeChild(captureButton);

      // Resolve the promise with the captured image data
      resolve(imageData);
    });
  });
}

/* 
Usage example:

captureImage()
  .then((imageData) => {
    console.log("Captured image:", imageData);
    // You can now set the imageData as the src of an <img> element, send it to a server, etc.
    const img = document.createElement("img");
    img.src = imageData;
    document.body.appendChild(img);
  })
  .catch((error) => {
    console.error(error);
  });
  
*/
