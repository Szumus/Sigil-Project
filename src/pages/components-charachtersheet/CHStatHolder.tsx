import { useEffect } from "react";
import { useCharacterStore } from "../../store/useCharacterStore";
import { StatProps } from "../../types/props";

// Poprawny import JSON-a
import statConfigs from "../../json/stats.json";

const CHStatHolder = ({ statsName, numberOfInputs }: StatProps) => {
  const character = useCharacterStore((state) => state.character);
  const updateCharacter = useCharacterStore((state) => state.updateCharacter);

  // Pobranie properties dla tej statystyki
  const statConfig = statConfigs.find((s) => s.statsName === statsName);

  // Inicjalizacja property w store jeśli jeszcze nie istnieje
  useEffect(() => {
    if (!character.stats[statsName] && statConfig) {
      const defaultProperties: any = {};
      (statConfig.properties || []).forEach((propName) => {
        defaultProperties[propName] = 0;
      });

      updateCharacter(["stats", statsName], {
        value: 0,
        modifier: 0,
        property: defaultProperties,
      });
    }
  }, [character.stats, statsName, statConfig, updateCharacter]);

  const statData = character.stats[statsName] || { property: {} };

  // Lista property do renderowania (prawdziwe nazwy z JSON)
  const propertiesToRender =
    statConfig?.properties.slice(0, numberOfInputs) || [];

  return (
    <div className="border-2 w-80 mb-3 h-40 flex flex-col border-black rounded-xl p-1 space-y-4">
      {/* Górny wiersz */}
      <div className="flex justify-between items-center w-full">
        <h1 className="uppercase text-xl">{statsName}</h1>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            className="border-b-2 font-bold text-center p-1 text-xl h-10 w-14 border-amber-600"
            value={statData.value ?? 0}
            onChange={(e) =>
              updateCharacter(
                ["stats", statsName, "value"],
                Number(e.target.value)
              )
            }
          />
          <input
            type="number"
            className="border-b-2 font-bold text-center p-1 text-xl h-10 w-14 border-amber-600"
            value={statData.modifier ?? 0}
            onChange={(e) =>
              updateCharacter(
                ["stats", statsName, "modifier"],
                Number(e.target.value)
              )
            }
          />
        </div>
      </div>

      {/* Dolny wiersz — dynamiczny układ inputów */}
      <div
        className={[
          "flex items-center space-x-6",
          numberOfInputs > 2 ? "justify-between" : "space-x-12 justify-center",
        ].join(" ")}
      >
        {propertiesToRender.map((propName, index) => {
          const propValue = statData.property?.[propName] ?? 0;

          return (
            <input
              key={index}
              type="number"
              className="border-b-2 font-bold text-center p-1 text-md h-10 w-8 border-amber-600"
              value={propValue}
              onChange={(e) =>
                updateCharacter(
                  ["stats", statsName, "property", propName],
                  Number(e.target.value)
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default CHStatHolder;
