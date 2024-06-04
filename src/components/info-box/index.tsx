import { useState } from "react";
import { getInfoBoxDimensions } from "../../utils/canvas";
import { AppDateInterface } from "../../interfaces/common";

import "./styles.css";

interface InfoBoxProps {
  index: number;
  X1: number;
  X2: number;
  Y1: number;
  Y2: number;
  text: string;
  boxClassName: string;
  boxesClassNames: string[];
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
  boxesClassNames,
  deleteBoxHandler,
  setVisibleBoxIndexHandler,
  setDataHandler,
  visibleBoxIndex,
}: InfoBoxProps) {
  const [boxText, setBoxText] = useState(text);
  const [boxClass, setBoxClass] = useState(boxClassName);

  // In real application, the old state will be retrieved as an initial value from the BE
  const [oldBoxText, setOldBoxText] = useState(text);

  const { width, height } = getInfoBoxDimensions(X1, X2, Y1, Y2);

  const changeClassNameHandler = (newClassName?: string) => {
    if (newClassName) {
      setBoxClass(newClassName);
    }

    /**
     * Setting the the app data to the new state
     */
    setDataHandler((prev) => ({
      ...prev,
      boxes: [
        ...prev.boxes.slice(0, index),
        {
          class: newClassName ?? boxClass,
          points: prev.boxes[index].points,
          text: boxText,
        },
        ...prev.boxes.slice(index + 1),
      ],
    }));
  };

  const saveHandler = () => {
    setOldBoxText(boxText);
    changeClassNameHandler();
    setVisibleBoxIndexHandler(undefined);
  };

  const cancelHandler = () => {
    setBoxText(oldBoxText);
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
          <select
            name="box-class"
            value={boxClass}
            onChange={(e) => changeClassNameHandler(e.target.value)}
          >
            {boxesClassNames.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>

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
