import { useState } from "react";
import { useCharacterStore } from "../../store/useCharacterStore";
import { StatProps } from "../../types/props";
import Stats from "../../json/stats.json";
import CHStatHolder from "./CHStatHolder";

const CHStats = () => {
  const character = useCharacterStore((state) => state.character);
  const updateCharacter = useCharacterStore((state) => state.updateCharacter);
  const [stats] = useState<StatProps[]>(Stats);
  const teqique: StatProps = stats[0];
  const restStats: StatProps[] = stats.slice(1);

  const [editingTech, setEditingTech] = useState(false);

  const calculateTeqiqueModifier = (value: number) => {
    if (value < 20) return 0; // 0–19
    if (value < 30) return 2; // 20–29
    return 2 + Math.floor((value - 30) / 10) + 1; // powyżej 30
  };

  const level = character.main.level ?? 1;
  const maxPoints = 44 + (level - 1);
  const baseSum = Object.entries(character.stats).reduce(
    (sum, [key]) => sum + (key === "TECHNIKA" ? 10 : 4),
    0
  );
  const currentSum = Object.entries(character.stats).reduce(
    (sum, [key, stat]) =>
      sum + ((stat as any).value ?? (key === "TECHNIKA" ? 10 : 4)),
    0
  );
  const remainingPoints = maxPoints - (currentSum - baseSum);

  const handleTechChange = (newValue: number) => {
    const oldValue = character.stats["TECHNIKA"]?.value ?? 10;
    const diff = newValue - oldValue;

    // Jeśli nie jesteśmy w trybie edycji, obowiązuje remainingPoints
    if (!editingTech && diff > 0 && diff > remainingPoints) return;

    const limitedValue = Math.max(1, newValue);
    const newModifier = calculateTeqiqueModifier(limitedValue);

    updateCharacter(["stats", "TECHNIKA", "value"], limitedValue);
    updateCharacter(["stats", "TECHNIKA", "modifier"], newModifier);
  };

  const toggleEditingTech = () => {
    setEditingTech((prev) => !prev);
  };

  return (
    <div>
      <div className="w-84 h-18 border-2 space-x-6 border-black rounded-xl flex items-center p-4 mb-3">
        <h1 className="text-xl">{teqique.statsName}</h1>

        <input
          type="number"
          className="border-b-2 text-center mb-4 font-bold text-xl h-10 w-14 border-amber-600"
          value={character.stats["TECHNIKA"]?.value ?? 10}
          onChange={(e) => handleTechChange(Number(e.target.value))}
        />

        <input
          type="number"
          className="border-b-2 text-center mb-4 font-bold text-xl h-10 w-14 border-amber-600 bg-gray-200"
          value={character.stats["TECHNIKA"]?.modifier ?? 0}
          readOnly
        />

        <button
          title="Edit"
          className={`mt-1 w-7 h-7 text-xs bg-amber-600 hover:bg-amber-700 hover:w-8 hover:h-8 duration-200 flex justify-center items-center rounded ${
            editingTech ? "bg-amber-700" : ""
          }`}
          onClick={toggleEditingTech}
        >
          {editingTech ? "✔" : "✎"}
        </button>
      </div>

      {restStats.map((i, index) => (
        <CHStatHolder
          key={index}
          statsName={i.statsName}
          numberOfInputs={i.numberOfInputs}
        />
      ))}
    </div>
  );
};

export default CHStats;
