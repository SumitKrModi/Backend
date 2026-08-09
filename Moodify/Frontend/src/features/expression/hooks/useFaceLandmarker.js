import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function useFaceLandmarker(videoRef) {
  const [expression, setExpression] = useState("Loading...");
  const [blendShapes, setBlendShapes] = useState([]);

  const faceLandmarkerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
      );

      faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-assets/face_landmarker_v2_with_blendshapes.task",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
        },
      );

      startDetection();
    }

    function startDetection() {
      const detect = () => {
        if (!isMounted || !videoRef.current || !faceLandmarkerRef.current) {
          animationRef.current = requestAnimationFrame(detect);
          return;
        }

        const video = videoRef.current;

        if (video.readyState >= 2) {
          const results = faceLandmarkerRef.current.detectForVideo(
            video,
            Date.now(),
          );

          if (results.faceBlendshapes?.length > 0) {
            const shapes = results.faceBlendshapes[0].categories;

            setBlendShapes(shapes);

            const exp = getExpression(shapes);
            setExpression(exp);
          }
        }

        animationRef.current = requestAnimationFrame(detect);
      };

      detect();
    }

    init();

    return () => {
      isMounted = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [videoRef]);

  return { expression, blendShapes };
}

//
// 🔥 Expression Logic (Fixed + Reliable)
//
function getExpression(blendShapes) {
  const map = {};
  blendShapes.forEach((b) => {
    map[b.categoryName] = b.score;
  });

  const val = (name) => map[name] || 0;

  const smile = (val("mouthSmileLeft") + val("mouthSmileRight")) / 2;

  const frown = (val("mouthFrownLeft") + val("mouthFrownRight")) / 2;

  const jawOpen = val("jawOpen");

  const eyeWide = (val("eyeWideLeft") + val("eyeWideRight")) / 2;

  const browUp = val("browInnerUp");

  console.log({
    smile: smile.toFixed(3),
    frown: frown.toFixed(3),
    jawOpen: jawOpen.toFixed(3),
    eyeWide: eyeWide.toFixed(3),
    browUp: browUp.toFixed(3),
  });

  // 😊 Happy
  if (smile > 0.35 && frown < 0.2) {
    return "😊 Happy";
  }

  // 😢 Sad
  if (frown > 0.02 && smile < 0.12) {
    return "😢 Sad";
  }

  // 😧 Shocked
  if (jawOpen > 0.45 && eyeWide > 0.3 && browUp > 0.3) {
    return "😧 Shocked";
  }

  if (val("browDownLeft") > 0.3 && val("browDownRight") > 0.3)
    return "😠 Angry";

  return "😐 Neutral";
}
