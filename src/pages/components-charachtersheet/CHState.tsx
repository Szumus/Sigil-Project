import React, { useState, useEffect } from "react";
import states from "../../json/states.json";
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";

// Typy dla statusów
interface Status {
  name: string;
  description: string;
  levels?: Array<{
    level: number;
    description: string;
  }>;
}

interface SelectedStatus {
  name: string;
  level?: number;
}

const CHState = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [currentStatuses, setCurrentStatuses] = useState<SelectedStatus[]>([]);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipText, setTooltipText] = useState<string>("");
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [editingStatusIndex, setEditingStatusIndex] = useState<number | null>(
    null
  );

  // Resetuj poziom gdy zmienia się status
  useEffect(() => {
    setSelectedLevel(1);
  }, [selectedStatus]);

  // Funkcja do skracania tekstu
  const truncateText = (text: string, maxLength: number = 30): string => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + "...";
  };

  // Funkcja do pokazywania tooltipa
  const handleMouseEnter = (
    e: React.MouseEvent,
    status: Status,
    level: number = 1
  ) => {
    let description = status.description;

    // Jeśli status ma poziomy (jak zmęczenie), pokaż wybrany poziom
    if (status.levels && status.levels.length > 0) {
      const levelData =
        status.levels.find((l) => l.level === level) || status.levels[0];
      description = `Poziom ${levelData.level}: ${levelData.description}`;
    }

    setTooltipText(description);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Pobierz wybrany status
  const getSelectedStatus = (): Status | undefined => {
    return states.find((status: Status) => status.name === selectedStatus);
  };

  // Funkcja dodająca status
  const addStatus = () => {
    if (selectedStatus && getSelectedStatus()) {
      const newStatus: SelectedStatus = {
        name: selectedStatus,
        level: selectedStatus === "ZMĘCZENIE" ? selectedLevel : undefined,
      };

      setCurrentStatuses((prev) => [...prev, newStatus]);
      setSelectedStatus("");
      setSelectedLevel(1);
    }
  };

  // Funkcja usuwająca status
  const removeStatus = (index: number) => {
    setCurrentStatuses((prev) => prev.filter((_, i) => i !== index));
    if (editingStatusIndex === index) {
      setEditingStatusIndex(null);
    }
  };

  // Funkcja aktualizująca poziom zmęczenia
  const updateFatigueLevel = (index: number, newLevel: number) => {
    setCurrentStatuses((prev) =>
      prev.map((status, i) =>
        i === index ? { ...status, level: newLevel } : status
      )
    );
  };

  // Funkcja do przełączania trybu edycji
  const toggleEditMode = (index: number) => {
    setEditingStatusIndex((prev) => (prev === index ? null : index));
  };

  const selectedStatusObj = getSelectedStatus();
  const isFatigue = selectedStatus === "ZMĘCZENIE";

  return (
    <div className="border-2 mt-2 border-black rounded-2xl w-64 p-3 shadow-sm">
      {/* Górna sekcja - Stan i Select w jednej linii */}
      <div className="flex items-center h-10">
        {/* Napis "Stan" po lewej z borderem po prawej */}
        <div className="flex items-center justify-center h-full pr-3 border-r-2 border-gray-300 w-1/3">
          <h1 className="text-lg font-bold text-gray-800">Stan</h1>
        </div>

        {/* Select po prawej z przyciskiem dodawania */}
        <div className="flex-1 pl-3 flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="flex-1 p-1 border border-gray-300 rounded text-sm focus:outline-none w-30 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Wybierz status</option>
            {states.map((status: Status) => (
              <option key={status.name} value={status.name}>
                {status.name}
              </option>
            ))}
          </select>

          {/* Przycisk dodawania statusu */}
          <button
            onClick={addStatus}
            disabled={!selectedStatus}
            className="w-7 h-7 items-center hover:bg-amber-700 justify-center flex bg-amber-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Dodaj status"
          >
            <IoMdAdd size={20} color="white" />
          </button>
        </div>
      </div>

      {/* Select poziomu zmęczenia - pojawia się tylko dla ZMĘCZENIE */}
      {isFatigue && selectedStatusObj && selectedStatusObj.levels && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Poziom zmęczenia:
          </label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(Number(e.target.value))}
            className="w-full p-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {selectedStatusObj.levels.map((level) => (
              <option key={level.level} value={level.level}>
                Poziom {level.level}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Opis aktualnie wybranego statusu - wyświetlany pod selectem */}
      {selectedStatusObj && (
        <div className="mt-3 pt-2 border-t border-gray-200">
          <div
            className="p-2 rounded cursor-help text-sm border border-gray-200 transition-colors bg-gray-50 hover:bg-gray-100"
            onMouseEnter={(e) =>
              handleMouseEnter(e, selectedStatusObj, selectedLevel)
            }
            onMouseLeave={handleMouseLeave}
          >
            <div className="font-medium text-gray-800 mb-1">
              {selectedStatusObj.name}
              {isFatigue && ` (Poziom ${selectedLevel})`}
            </div>
            <div className="text-gray-600">
              {truncateText(
                isFatigue && selectedStatusObj.levels
                  ? selectedStatusObj.levels.find(
                      (level) => level.level === selectedLevel
                    )?.description || ""
                  : selectedStatusObj.description
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lista aktualnych statusów */}
      {currentStatuses.length > 0 && (
        <div className="mt-3 pt-2 border-t border-gray-200">
          <div className="text-xs font-medium text-gray-700 mb-2">
            Aktywne statusy:
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {currentStatuses.map((status, index) => {
              const statusObj = states.find((s) => s.name === status.name);
              if (!statusObj) return null;

              const isStatusFatigue = status.name === "ZMĘCZENIE";
              const isEditing = editingStatusIndex === index;

              return (
                <div
                  key={index}
                  className="flex flex-col p-2 bg-green-50 rounded text-sm border border-green-200"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex-1 cursor-help"
                      onMouseEnter={(e) =>
                        handleMouseEnter(e, statusObj, status.level || 1)
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="font-medium text-green-800">
                        {status.name}
                        {isStatusFatigue &&
                          status.level &&
                          ` (Poziom ${status.level})`}
                      </div>
                      <div className="text-green-600 text-xs">
                        {truncateText(
                          isStatusFatigue && status.level && statusObj.levels
                            ? statusObj.levels.find(
                                (l) => l.level === status.level
                              )?.description || statusObj.description
                            : statusObj.description,
                          25
                        )}
                      </div>
                    </div>

                    <div className="flex gap-1">
                      {/* Przycisk edycji poziomu zmęczenia */}
                      {isStatusFatigue && statusObj.levels && (
                        <button
                          onClick={() => toggleEditMode(index)}
                          className="w-5 h-5 flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded text-white text-xs transition-colors"
                          title="Zmień poziom zmęczenia"
                        >
                          {isEditing ? "✓" : "✎"}
                        </button>
                      )}

                      {/* Przycisk usuwania statusu */}
                      <button
                        onClick={() => removeStatus(index)}
                        className="w-5 h-5 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded text-white text-xs transition-colors"
                        title="Usuń status"
                      >
                        <IoClose size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Edycja poziomu zmęczenia */}
                  {isStatusFatigue && isEditing && statusObj.levels && (
                    <div className="mt-2 pt-2 border-t border-green-300">
                      <label className="block text-xs font-medium text-green-700 mb-1">
                        Zmień poziom:
                      </label>
                      <select
                        value={status.level || 1}
                        onChange={(e) =>
                          updateFatigueLevel(index, Number(e.target.value))
                        }
                        className="w-full p-1 border border-green-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-green-500"
                      >
                        {statusObj.levels.map((level) => (
                          <option key={level.level} value={level.level}>
                            Poziom {level.level}
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
      )}

      {/* Tooltip */}
      {showTooltip && (
        <div
          className="fixed z-50 max-w-sm p-3 bg-amber-500 border border-black rounded-lg shadow-lg text-sm whitespace-pre-line"
          style={{
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y + 10}px`,
          }}
        >
          <div className="font-semibold text-black mb-1">Opis statusu:</div>
          <div className="text-black">{tooltipText}</div>
        </div>
      )}
    </div>
  );
};

export default CHState;
