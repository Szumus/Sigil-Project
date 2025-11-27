import React, { useState, useEffect } from "react";
import states from "../../json/states.json";
import StatusSelector from "../../components/StatusSelector";
import StatusList from "../../components/StatusLsist";
import ToolTips from "../../components/ToolTips";
import { Status, SelectedStatus } from "../../types/types";

const CHState = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [currentStatuses, setCurrentStatuses] = useState<SelectedStatus[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [tooltipText, setTooltipText] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const getStatusObj = (name: string) =>
    (states as Status[]).find((s) => s.name === name);

  useEffect(() => {
    setSelectedLevel(1);
  }, [selectedStatus]);

  const addStatus = () => {
    if (selectedStatus) {
      setCurrentStatuses((prev) => [
        ...prev,
        {
          name: selectedStatus,
          level: selectedStatus === "ZMĘCZENIE" ? selectedLevel : undefined,
        },
      ]);

      setSelectedStatus("");
      setSelectedLevel(1);
    }
  };

  const removeStatus = (index: number) => {
    setCurrentStatuses((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  const updateLevel = (index: number, lvl: number) => {
    setCurrentStatuses((prev) =>
      prev.map((s, i) => (i === index ? { ...s, level: lvl } : s))
    );
  };

  const toggleEdit = (i: number) =>
    setEditingIndex((prev) => (prev === i ? null : i));

  const showTooltip = (e: React.MouseEvent, status: Status, level: number) => {
    let desc = status.description;

    if (status.levels) {
      desc = status.levels.find((l) => l.level === level)?.description || desc;
    }

    setTooltipText(desc);
    setTooltipPos({ x: e.clientX, y: e.clientY });
    setTooltipVisible(true);
  };

  return (
    <div className="border-2 mt-2 border-black rounded-2xl w-64 p-3 shadow-sm">
      {/* WYBÓR STATUSU */}
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

      {/* LISTA STATUSÓW */}
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

      {/* TOOLTIP */}
      <ToolTips
        visible={tooltipVisible}
        text={tooltipText}
        x={tooltipPos.x}
        y={tooltipPos.y}
      />
    </div>
  );
};

export default CHState;
