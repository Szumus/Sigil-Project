import React, { useState, useEffect } from "react";
import rawStates from "../../json/states.json";
import StatusSelector from "../../components/StatusSelector";
import StatusList from "../../components/StatusLsist";
import ToolTips from "../../components/ToolTips";
import { Status, SelectedStatus } from "../../types/types";
import { useCharacterStore } from "../../store/useCharacterStore";

const states: Status[] = rawStates;

const CHState = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [tooltipText, setTooltipText] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // ✅ STATUSY Z ZUSTAND
  const currentStatuses = useCharacterStore(
    (state) => state.character.statuses
  );

  const updateCharacter = useCharacterStore((state) => state.updateCharacter);

  useEffect(() => {
    setSelectedLevel(1);
  }, [selectedStatus]);

  // ✅ DODAWANIE DO ZUSTAND
  const addStatus = () => {
    if (!selectedStatus) return;

    const newStatus: SelectedStatus = {
      name: selectedStatus,
      level: selectedStatus === "ZMĘCZENIE" ? selectedLevel : undefined,
    };

    updateCharacter(["statuses"], [...currentStatuses, newStatus]);

    setSelectedStatus("");
    setSelectedLevel(1);
  };

  // ✅ USUWANIE Z ZUSTAND
  const removeStatus = (index: number) => {
    const updated = currentStatuses.filter((_, i) => i !== index);
    updateCharacter(["statuses"], updated);

    if (editingIndex === index) setEditingIndex(null);
  };

  // ✅ EDYCJA POZIOMU Z ZUSTAND
  const updateLevel = (index: number, lvl: number) => {
    const updated = currentStatuses.map((s, i) =>
      i === index ? { ...s, level: lvl } : s
    );

    updateCharacter(["statuses"], updated);
  };

  const toggleEdit = (i: number) =>
    setEditingIndex((prev) => (prev === i ? null : i));

  const showTooltip = (e: React.MouseEvent, status: Status, level: number) => {
    let desc = status.description;

    if (status.levels) {
      desc = status.levels.find((l) => l.level === level)?.description || desc;
    }

    setTooltipText(desc || "");
    setTooltipPos({ x: e.clientX, y: e.clientY });
    setTooltipVisible(true);
  };

  return (
    <div className="border-2 mt-2 border-black rounded-2xl w-80 p-3 shadow-sm">
      <StatusSelector
        states={states}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        addStatus={addStatus}
        onPreviewEnter={showTooltip}
        onPreviewLeave={() => setTooltipVisible(false)}
      />

      {currentStatuses.length > 0 && (
        <StatusList
          statuses={currentStatuses}
          states={states}
          editingIndex={editingIndex}
          toggleEdit={toggleEdit}
          updateLevel={updateLevel}
          removeStatus={removeStatus}
          onHoverEnter={showTooltip}
          onHoverLeave={() => setTooltipVisible(false)}
        />
      )}

      <ToolTips
        visible={tooltipVisible}
        text={tooltipText}
        x={tooltipPos.x}
        y={tooltipPos.y}
        what="statusu"
      />
    </div>
  );
};

export default CHState;
