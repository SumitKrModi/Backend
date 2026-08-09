import { useRef } from "react";
import WebcamFeed from "./WebcamFeed";
import useFaceLandmarker from "../hooks/useFaceLandmarker";
export default function FaceDetector() {
  const videoRef = useRef(null);

  const { expression, blendShapes } = useFaceLandmarker(videoRef);


  return (
    <div style={{ textAlign: "center" }}>
      <h2>Face Expression Detector</h2>

      <WebcamFeed videoRef={videoRef} />

      <h1 style={{ marginTop: "20px" }}>{expression}</h1>
      <pre style={{ fontSize: "10px", textAlign: "left" }}>
  {JSON.stringify(
    blendShapes
      .sort((a, b) => b.score - a.score)
      .slice(0, 5),
    null,
    2
  )}
</pre>
    </div>
  );
}