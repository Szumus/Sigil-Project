import React from "react";

interface Props {
  visible: boolean;
  text: string;
  x: number;
  y: number;
  what: string;
}

const Tooltips: React.FC<Props> = ({ visible, text, x, y, what }) => {
  if (!visible) return null;

  return (
    <div
      className="fixed z-50 max-w-sm p-3 bg-amber-500 border border-black rounded-lg shadow text-sm"
      style={{ left: x + 10, top: y + 10 }}
    >
      <div className="font-semibold mb-1">Opis {what}:</div>
      {text}
    </div>
  );
};

export default Tooltips;
