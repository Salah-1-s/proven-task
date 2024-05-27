import { useEffect, useRef } from "react";
import Data from "./consts/task-object - Front End.json";

import "./App.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef?.current) {
      return;
    }

    const ctx = canvasRef.current ? canvasRef.current.getContext("2d") : null;
    const myImage = new Image();
    myImage.src = Data.base64;
    ctx?.drawImage(myImage, 0, 0);
  }, [canvasRef]);

  return (
    <main>
      <div className="canvas__wrapper">
        <canvas ref={canvasRef} id="canvas" height="1450" width="1100" />
      </div>
    </main>
  );
}

export default App;
