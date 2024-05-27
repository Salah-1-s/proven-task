import { useEffect, useRef, useState } from "react";
import InfoBox from "./components/info-box";
import Sidebar from "./components/sidebar";
import Data from "./consts/task-object - Front End.json";
import { groupByClassName } from "./utils/common";
import {
  AppDateInterface,
  GroupedBoxesByClassInterface,
} from "./definitions/interfaces/common";

import "./App.css";

function App() {
  const [data, setData] = useState<AppDateInterface>(Data);
  const [groupedData, setGroupedData] =
    useState<GroupedBoxesByClassInterface>();
  const [visibleBoxIndex, setVisibleBoxIndex] = useState<number>();

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
  };

  useEffect(() => {
    setGroupedData(groupByClassName(data.boxes, "class"));
  }, [data]);

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
      <Sidebar
        classes={groupedData}
        setVisibleBoxIndexHandler={setVisibleBoxIndexHandler}
      />

      <div className="canvas__wrapper">
        <canvas ref={canvasRef} id="canvas" height="1450" width="1100"></canvas>
        {data.boxes.map((box, i) => (
          <InfoBox
            // Setting a unique key because some of the boxes have the same text/class.
            // And after deleting one of them, their indexes do conflict
            key={box.points[0]}
            index={i}
            X1={box.points[0]}
            X2={box.points[2]}
            Y1={box.points[1]}
            Y2={box.points[3]}
            text={box.text}
            boxClassName={box.class}
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
