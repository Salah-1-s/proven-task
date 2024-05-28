import { GroupedBoxesByClassInterface } from "../../interfaces/common";

import "./styles.css";

interface SidebarProps {
  classes?: GroupedBoxesByClassInterface;
  setVisibleBoxIndexHandler: (index: number) => void;
}

export default function Sidebar({
  classes,
  setVisibleBoxIndexHandler,
}: SidebarProps) {
  if (!classes) {
    return <p>Loading</p>;
  }

  return (
    <nav className="sidebar">
      {Object.keys(classes).map((c) => (
        <div key={c}>
          <h6>{c}</h6>
          {classes[c].map((box) => (
            <button
              key={box.points[0]}
              onClick={() => setVisibleBoxIndexHandler(box.index)}
            >
              {box.text}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
}
