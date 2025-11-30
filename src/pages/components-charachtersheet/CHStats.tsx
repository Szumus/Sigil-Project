import { useState } from "react";
import CHStatHolder from "./CHStatHolder";
import Stats from "../../json/stats.json";
import { StatProps } from "../../types/props";
import { useCharacterStore } from "../../store/useCharacterStore";

const CHStats = () => {
   const character = useCharacterStore((state) => state.character);
    const updateCharacter = useCharacterStore((state) => state.updateCharacter);
  // jeśli Stats to tablica obiektów, np. [{ statName: "...", numberOfInputs: 2 }, ...]
  const [stats] = useState<StatProps[]>(Stats);
  const teqique: StatProps = stats[0];
  const restStats: StatProps[] = stats.slice(1);

const calculateTeqiqueModifier = (value: number) => {
  if (value < 20) return 0; // 0–19
  if (value < 30) return 2; // 20–29

  // powyżej 30
  return 2 + Math.floor((value - 30) / 10) + 1;
};


  return (
    <div>
     <div className="w-85 h-18 border-2 space-x-6 border-black rounded-xl flex items-center p-4 mb-3">
  <h1 className="text-xl">{teqique.statsName}</h1>

  {/* VALUE */}
  <input
    type="number"
    className="border-b-2 text-center mb-4 font-bold text-xl h-10 w-14 border-amber-600"
    value={character.stats["teqique"]?.value ?? 10}
    onChange={(e) => {
      const newValue = Number(e.target.value);
      const newModifier = calculateTeqiqueModifier(newValue);

      updateCharacter(["stats", "teqique", "value"], newValue);
      updateCharacter(["stats", "teqique", "modifier"], newModifier);
    }}
  />

  {/* MODIFIER — readonly */}
  <input
    type="number"
    className="border-b-2 text-center mb-4 font-bold text-xl h-10 w-14 border-amber-600 bg-gray-200"
    value={character.stats["teqique"]?.modifier ?? 0}
    readOnly
  />
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
