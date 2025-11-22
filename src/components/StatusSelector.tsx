import React from "react";
import { Status } from "../types/types";
import { truncateText } from "../utils/truncrateText";
import { IoMdAdd } from "react-icons/io";

interface Props {
  states: Status[];
  selectedStatus: string;
  setSelectedStatus: (v: string) => void;
  selectedLevel: number;
  setSelectedLevel: (v: number) => void;
  addStatus: () => void;
  onPreviewEnter: (e: React.MouseEvent, status: Status, level: number) => void;
  onPreviewLeave: () => void;
}

const StatusSelector: React.FC<Props> = ({
  states,
  selectedStatus,
  setSelectedStatus,
  selectedLevel,
  setSelectedLevel,
  addStatus,
  onPreviewEnter,
  onPreviewLeave,
}) => {
  const selectedObj = states.find((s) => s.name === selectedStatus);
  const isFatigue = selectedStatus === "ZMĘCZENIE";

  return (
    <>
      {/* SELECT STATUSU */}
      <div className="flex items-center h-10">
        <div className="flex items-center justify-center h-full pr-3 border-r-2 border-gray-300 w-1/3">
          <h1 className="text-lg font-bold text-gray-800">Stan</h1>
        </div>

        <div className="flex-1 pl-3 flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="flex-1 p-1 border w-30 border-gray-300 rounded text-sm"
          >
            <option value="">Wybierz status</option>
            {states.map((status) => (
              <option key={status.name} value={status.name}>
                {status.name}
              </option>
            ))}
          </select>

          <button
            onClick={addStatus}
            disabled={!selectedStatus}
            className="w-7 h-7 flex justify-center items-center bg-amber-600 hover:bg-amber-700 text-white rounded disabled:opacity-50"
          >
            <IoMdAdd size={20} />
          </button>
        </div>
      </div>

      {/* SELECT POZIOMU ZMĘCZENIA */}
      {isFatigue && selectedObj?.levels && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <label className="text-xs font-medium text-gray-700">Poziom:</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(Number(e.target.value))}
            className="w-full p-1 border rounded text-sm"
          >
            {selectedObj.levels.map((lvl) => (
              <option key={lvl.level} value={lvl.level}>
                Poziom {lvl.level}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* PODGLĄD WYBRANEGO STATUSU */}
      {selectedObj && (
        <div className="mt-3 pt-2 border-t border-gray-200">
          <div
            className="p-2 border bg-gray-50 hover:bg-gray-100 cursor-help rounded"
            onMouseEnter={(e) => onPreviewEnter(e, selectedObj, selectedLevel)}
            onMouseLeave={onPreviewLeave}
          >
            <div className="font-medium text-gray-800 mb-1">
              {selectedObj.name}
              {isFatigue && ` (Poziom ${selectedLevel})`}
            </div>

            <div className="text-gray-600 text-sm">
              {truncateText(
                isFatigue
                  ? selectedObj.levels?.find((l) => l.level === selectedLevel)
                      ?.description || ""
                  : selectedObj.description
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatusSelector;
