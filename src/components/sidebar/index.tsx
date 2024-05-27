import { GroupedBoxesByClassInterface } from "../../definitions/interfaces/common";

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
    <nav
      style={{
        position: "absolute",
        top: 0,
        insetInlineStart: 0,
        padding: "5px",
        border: "1px solid red",
      }}
    >
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
