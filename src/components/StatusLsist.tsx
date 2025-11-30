import React from "react";
import { Status, SelectedStatus } from "../types/types";
import { truncateText } from "../utils/truncrateText";
import { IoClose } from "react-icons/io5";

interface Props {
  statuses: SelectedStatus[];
  states: Status[];
  editingIndex: number | null;
  toggleEdit: (i: number) => void;
  updateLevel: (i: number, lvl: number) => void;
  removeStatus: (i: number) => void;
  onHoverEnter: (e: React.MouseEvent, status: Status, level: number) => void;
  onHoverLeave: () => void;
}

const StatusList: React.FC<Props> = ({
  statuses,
  states,
  editingIndex,
  toggleEdit,
  updateLevel,
  removeStatus,
  onHoverEnter,
  onHoverLeave,
}) => {
  return (
    <div className="mt-3 pt-2 border-t border-gray-200">
      <div className="text-xs font-medium text-gray-700 mb-2">
        Aktywne statusy:
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {statuses.map((status, index) => {
          const obj = states.find((s) => s.name === status.name);
          if (!obj) return null;

          const isFatigue = status.name === "ZMĘCZENIE";
          const editing = editingIndex === index;

          return (
            <div key={index} className="p-2 bg-green-50 border rounded">
              <div className="flex justify-between items-center">
                <div
                  className="cursor-help flex-1"
                  onMouseEnter={(e) => onHoverEnter(e, obj, status.level || 1)}
                  onMouseLeave={onHoverLeave}
                >
                  <div className="font-medium text-sm text-green-800">
                    {status.name}
                    {isFatigue && status.level && ` (Poziom ${status.level})`}
                  </div>
                  <div className="text-green-600 text-xs">
                    {truncateText(
                      isFatigue && status.level
                        ? obj.levels?.find((l) => l.level === status.level)
                            ?.description || ""
                        : obj.description ?? "",
                      25
                    )}
                  </div>
                </div>

                <div className="flex gap-1">
                  {isFatigue && (
                    <button
                      onClick={() => toggleEdit(index)}
                      className="w-5 h-5 bg-blue-500 text-white rounded text-xs"
                    >
                      {editing ? "✓" : "✎"}
                    </button>
                  )}

                  <button
                    onClick={() => removeStatus(index)}
                    className="w-5 h-5 bg-red-500 text-white rounded flex items-center justify-center"
                  >
                    <IoClose size={14} />
                  </button>
                </div>
              </div>

              {/* Edycja poziomu */}
              {isFatigue && editing && obj.levels && (
                <div className="mt-2 pt-2 border-t border-green-300">
                  <select
                    value={status.level || 1}
                    onChange={(e) => updateLevel(index, Number(e.target.value))}
                    className="w-full p-1 border rounded text-xs"
                  >
                    {obj.levels.map((l) => (
                      <option key={l.level} value={l.level}>
                        Poziom {l.level}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusList;
