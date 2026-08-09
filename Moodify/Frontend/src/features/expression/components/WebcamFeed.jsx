import { useEffect, useRef } from "react";

export default function WebcamFeed({ videoRef }) {
  useEffect(() => {
    async function setupCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }

    setupCamera();
  }, [videoRef]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      style={{ width: "400px", borderRadius: "10px" }}
    />
  );
}