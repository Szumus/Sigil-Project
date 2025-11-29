import { useEffect, useState } from "react";
import { useCharacterStore } from "../../store/useCharacterStore";
import { StatProps } from "../../types/props";
import statConfigs from "../../json/stats.json";

const CHStatHolder = ({ statsName, numberOfInputs }: StatProps) => {
  const character = useCharacterStore((state) => state.character);
  const updateCharacter = useCharacterStore((state) => state.updateCharacter);

  const statConfig = statConfigs.find((s) => s.statsName === statsName);

  const calculateModifier = (value: number, steps: any[]) => {
    if (!steps) return 0;

    for (let step of steps) {
      if (step.to !== undefined && value >= step.from && value <= step.to) {
        return step.modifier;
      }
    }

    const progressiveStep = steps.find((s) => s.step !== undefined && value >= s.from);
    if (progressiveStep) {
      const extra = Math.floor((value - progressiveStep.from) / progressiveStep.step);
      return (progressiveStep.modifierStart ?? 0) + extra;
    }

    return 0;
  };

  const calculatePropertyValue = (prop: any, value: number) => {
    if (prop.name === "passivePer") return Math.floor(value / 2);
    if (prop.name === "hpDice") {
      if (value < 15) return "d4";
      if (value < 30) return "d6";
      if (value < 45) return "d8";
      if (value < 60) return "d10";
      if (value < 75) return "d12";
      return "d20";
    }
    if (prop.name === "willDice") {
      if (value < 10) return "d4";
      if (value < 20) return "d6";
      if (value < 30) return "d8";
      if (value < 40) return "d10";
      if (value < 50) return "d12";
      return "d20";
    }
    if (statsName === "INTELIGENCJA") {
      if (prop.name === "spellSlots") return value < 10 ? 2 : 2 + Math.floor(value / 10) * 5;
      if (prop.name === "cantripSlots") return value < 10 ? 2 : 2 + Math.floor(value / 10) * 2;
    }
    if (statsName === "ZRĘCZNOŚĆ" && prop.name === "numOfAtc") {
      if (value < 20) return 1;
      return 1 + Math.floor((value - 20) / 20) + 1;
    }

    if (!prop.step) return prop.baseValue ?? 0;

    const extraSteps = Math.floor((value - prop.baseLevel) / prop.step);
    return (prop.baseValue ?? 0) + extraSteps * (prop.stepValue ?? 0);
  };

  const [editingAll, setEditingAll] = useState(false);

  useEffect(() => {
    if (!character.stats[statsName] && statConfig) {
      const defaultProperties: any = {};
      (statConfig.properties || []).forEach((prop: any) => {
        defaultProperties[prop.name] = calculatePropertyValue(prop, statConfig.statsName === "TECHNIKA" ? 10 : 4);
      });

      const initialValue = statConfig.statsName === "TECHNIKA" ? 10 : 4;

      updateCharacter(["stats", statsName], {
        value: initialValue,
        modifier: calculateModifier(initialValue, statConfig.modifierSteps),
        property: defaultProperties,
      });
    }
  }, [character.stats, statsName, statConfig, updateCharacter]);

  const statData = character.stats[statsName] || { property: {} };
  const propertiesToRender = statConfig?.properties.slice(0, numberOfInputs) || [];

  const handleValueChange = (newValue: number) => {
    const newModifier = calculateModifier(newValue, statConfig?.modifierSteps || []);

    updateCharacter(["stats", statsName, "value"], newValue);
    updateCharacter(["stats", statsName, "modifier"], newModifier);

    propertiesToRender.forEach((prop: any) => {
      if (!editingAll) {
        const newPropValue = calculatePropertyValue(prop, newValue);
        updateCharacter(["stats", statsName, "property", prop.name], newPropValue);
      }
    });
  };

  const toggleEditingAll = () => {
    setEditingAll((prev) => !prev);
  };

  const handlePropChange = (propName: string, value: any) => {
    updateCharacter(["stats", statsName, "property", propName], value);
  };

  return (
    <div className="border-2 w-80 mb-3 h-42 flex flex-col border-black rounded-xl p-1 space-y-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="uppercase text-xl">{statsName}</h1>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            className="border-b-2 font-bold text-center p-1 text-xl h-10 w-14 border-amber-600"
            value={statData.value ?? 0}
            onChange={(e) => handleValueChange(Number(e.target.value))}
          />
          <input
            type="number"
            readOnly
            className="border-b-2 font-bold text-center p-1 text-xl h-10 w-14 border-amber-600 bg-gray-200"
            value={statData.modifier}
          />
          <button
            className="mt-1 text-xs bg-amber-400 px-2 rounded"
            onClick={toggleEditingAll}
          >
            {editingAll ? "✅ " : "✏️ "}
          </button>
        </div>
      </div>

      <div
        className={[
          "flex items-center space-x-4",
          numberOfInputs > 2 ? "justify-between" : "space-x-10 justify-center",
        ].join(" ")}
      >
        {propertiesToRender.map((prop: any, index) => {
          const propValue = statData.property?.[prop.name] ?? 0;

          return (
            <div key={index} className="flex flex-col items-center">
              <input
                type="text"
                className={`border-b-2 font-bold text-center p-1 text-md h-8 w-12 border-amber-600 ${
                  !editingAll ? "bg-gray-200" : ""
                }`}
                value={propValue}
                readOnly={!editingAll}
                onChange={(e) => handlePropChange(prop.name, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CHStatHolder;
