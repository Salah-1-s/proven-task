import { useState } from "react";
import { getInfoBoxDimensions } from "../../utils/canvas";
import { AppDateInterface } from "../../definitions/interfaces/common";

import "./styles.css";

interface InfoBoxProps {
  index: number;
  X1: number;
  X2: number;
  Y1: number;
  Y2: number;
  text: string;
  boxClassName: string;
  setVisibleBoxIndexHandler: (index?: number) => void;
  deleteBoxHandler: () => void;
  setDataHandler: React.Dispatch<React.SetStateAction<AppDateInterface>>;
  visibleBoxIndex?: number;
}

export default function InfoBox({
  index,
  X1,
  X2,
  Y1,
  Y2,
  text,
  boxClassName,
  deleteBoxHandler,
  setVisibleBoxIndexHandler,
  setDataHandler,
  visibleBoxIndex,
}: InfoBoxProps) {
  const [boxText, setBoxText] = useState(text);
  const [boxClass, setBoxClass] = useState(boxClassName);

  // In real application, the old state will be retrieved as an initial value from the BE
  const [oldBoxText, setOldBoxText] = useState(text);
  const [oldBoxClass, setOldBoxClass] = useState(boxClassName);

  const { width, height } = getInfoBoxDimensions(X1, X2, Y1, Y2);

  const saveHandler = () => {
    setOldBoxText(boxText);
    setOldBoxClass(boxClass);
    setVisibleBoxIndexHandler(undefined);

    /**
     * Setting the the app data to the new state
     */
    setDataHandler((prev) => ({
      ...prev,
      boxes: [
        ...prev.boxes.slice(0, index),
        { class: boxClass, points: prev.boxes[index].points, text: boxText },
        ...prev.boxes.slice(index + 1),
      ],
    }));
  };

  const cancelHandler = () => {
    setBoxText(oldBoxText);
    setBoxClass(oldBoxClass);
    setVisibleBoxIndexHandler(undefined);
  };

  return (
    <div
      className="box"
      style={{
        insetInlineStart: X1,
        top: Y1,
      }}
    >
      <button
        aria-label={text}
        onClick={() => setVisibleBoxIndexHandler(index)}
        className={`${boxClassName} box__button`}
        style={{
          width,
          height,
        }}
      >
        click
      </button>
      {Boolean(visibleBoxIndex === index) && (
        <div>
          <input value={boxText} onChange={(e) => setBoxText(e.target.value)} />
          <input
            value={boxClass}
            onChange={(e) => setBoxClass(e.target.value)}
          />

          <div>
            <button onClick={saveHandler}>Save</button>
            <button onClick={cancelHandler}>Cancel</button>
            <button onClick={deleteBoxHandler}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
