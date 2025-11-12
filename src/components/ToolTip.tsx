import { useState } from "react";
import { ToolTipProps } from "../types/props";

const ToolTip = ({ text, icon }: ToolTipProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className="relative flex w-6 h-6"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {icon}
      <div
        className={`absolute center scale-80  -top-11/12 -left-8 mr-2 mb-10 bg-[#5b1a1a] text-white text-sm rounded px-2 py-1 whitespace-nowrap z-10
          transition-all duration-300 ease-in-out 
          ${
            visible
              ? "opacity-100 -translate-y-3"
              : "opacity-0 -translate-y-10 pointer-events-none"
          }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ToolTip;
