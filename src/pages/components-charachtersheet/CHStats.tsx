import { useState } from "react";
import CHStatHolder from "./CHStatHolder";
import Stats from "../../json/stats.json";
import { StatProps } from "../../types/props";

const CHStats = () => {
  // jeśli Stats to tablica obiektów, np. [{ statName: "...", numberOfInputs: 2 }, ...]
  const [stats] = useState<StatProps[]>(Stats);
  const teqique: StatProps = stats[0];
  const restStats: StatProps[] = stats.slice(1);

  return (
    <div>
      <div className="w-80 h-18 border-2 space-x-6 border-black rounded-xl flex items-center p-4 mb-3">
        <h1 className="text-xl">{teqique.statsName}</h1>
        <input
          type="text"
          className="border-b-2 text-center mb-4 font-bold text-xl h-10 w-14 border-amber-600"
        />
        <input
          type="text"
          className="border-b-2 text-center mb-4 font-bold  text-xl h-10 w-14 border-amber-600"
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
