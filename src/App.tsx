import { useEffect, useRef, useState } from "react";
import InfoBox from "./components/info-box";
import Sidebar from "./components/sidebar";
import Data from "./consts/task-object - Front End.json";
import { groupByClassName } from "./utils/common";
import {
  AppDateInterface,
  GroupedBoxesByClassInterface,
} from "./interfaces/common";

import "./App.css";

function App() {
  const [data, setData] = useState<AppDateInterface>(Data);
  const [groupedData, setGroupedData] =
    useState<GroupedBoxesByClassInterface>();
  const [visibleBoxIndex, setVisibleBoxIndex] = useState<number>();
  const [scaleRatio, setScaleRatio] = useState<number>();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setDataHandler = (newData: AppDateInterface) => {
    setData(newData);
  };

  const setVisibleBoxIndexHandler = (index?: number) => {
    setVisibleBoxIndex(index);
  };

  const deleteBoxHandler = (index: number) => {
    const newArray = [...data.boxes];
    newArray.splice(index, 1);
    setData((prev) => ({ ...prev, boxes: newArray }));
    setVisibleBoxIndex(undefined);
  };

  useEffect(() => {
    setGroupedData(groupByClassName(data.boxes, "class"));
  }, [data]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      const image = new Image();

      image.onload = () => {
        const canvasHeight = window.innerHeight;
        const aspectRatio = image.width / image.height;

        canvas.height = canvasHeight;
        canvas.width = canvasHeight * aspectRatio;

        const scaledWidth = canvas.height * aspectRatio;
        const scaledHeight = canvas.height;
        setScaleRatio(scaledHeight / image.height);

        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);
        }
      };

      image.src = Data.base64;
    }
  }, []);

  return (
    <main>
      <Sidebar
        classes={groupedData}
        setVisibleBoxIndexHandler={setVisibleBoxIndexHandler}
      />

      <div className="canvas__wrapper">
        <canvas
          ref={canvasRef}
          id="canvas"
          style={{ display: "block", height: "100vh" }}
        />
        {data.boxes.map((box, i) => (
          <InfoBox
            // Setting a unique key because some of the boxes have the same text/class.
            // And after deleting one of them, their indexes do conflict
            key={box.points[0]}
            index={i}
            X1={box.points[0] * (scaleRatio || 0)}
            X2={box.points[2] * (scaleRatio || 0)}
            Y1={box.points[1] * (scaleRatio || 0)}
            Y2={box.points[3] * (scaleRatio || 0)}
            text={box.text}
            boxClassName={box.class}
            boxesClassNames={Object.keys(groupedData || {})}
            visibleBoxIndex={visibleBoxIndex}
            setVisibleBoxIndexHandler={setVisibleBoxIndexHandler}
            deleteBoxHandler={() => deleteBoxHandler(i)}
            setDataHandler={
              setDataHandler as React.Dispatch<
                React.SetStateAction<AppDateInterface>
              >
            }
          />
        ))}
      </div>
    </main>
  );
}

export default App;
