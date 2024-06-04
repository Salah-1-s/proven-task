import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  if (!classes) {
    return <p>Loading</p>;
  }

  return (
    <>
      <button
        aria-label="sidebar-toggle"
        onClick={toggleSidebar}
        className={`sidebar__toggle ${isOpen && "sidebar__toggle--open"}`}
      >
        <div></div>
        <div></div>
        <div></div>
      </button>
      <nav className={`sidebar ${isOpen && "sidebar--shown"}`}>
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
    </>
  );
}
