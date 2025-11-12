import { useState } from "react";
import CHStatHolder from "./CHStatHolder";
import Stats from "../../json/stats.json";
import { StatProps } from "../../types/props";

const CHStats = () => {
  // jeśli Stats to tablica obiektów, np. [{ statName: "...", numberOfInputs: 2 }, ...]
  const [stats] = useState<StatProps[]>(Stats);

  return (
    <div>
      {stats.map((i, index) => (
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
