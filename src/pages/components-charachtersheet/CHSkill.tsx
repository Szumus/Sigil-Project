import { useState, useEffect } from "react";
import { Skills } from "../../types/types";
import { IoMdAdd } from "react-icons/io";
import { useCharacterStore } from "../../store/useCharacterStore"; // Dostosuj ścieżkę

const CHSkill = () => {
  const stats = [
    "TEQ",
    "STR",
    "DEX",
    "INT",
    "MAG",
    "PER",
    "END",
    "WIT",
    "CHA",
    "WILL",
  ];

  const { character, updateCharacter } = useCharacterStore();

  const [skills] = useState<Skills[]>([
    { skillName: "Atletyka", skillModifyer: "STR" },
    { skillName: "Akrobatyka", skillModifyer: "DEX" },
    { skillName: "Ukrywanie", skillModifyer: "DEX" },
    { skillName: "Zmysł Magiczny", skillModifyer: "MAG" },
    { skillName: "Umysł", skillModifyer: "INT" },
    { skillName: "Przeszukiwanie", skillModifyer: "PER" },
    { skillName: "Wzrok", skillModifyer: "PER" },
    { skillName: "Słuch", skillModifyer: "PER" },
    { skillName: "Węch", skillModifyer: "PER" },
    { skillName: "Aparycja", skillModifyer: "CHA" },
  ]);

  // Mapowanie nazw umiejętności na klucze w store
  const skillKeyMap: { [key: string]: string } = {
    Atletyka: "athletics",
    Akrobatyka: "acrobatics",
    Ukrywanie: "hiding",
    "Zmysł Magiczny": "magicSense",
    Umysł: "mind",
    Przeszukiwanie: "search",
    Wzrok: "sight",
    Słuch: "hearing",
    Węch: "smell",
    Aparycja: "appearance",
  };

  // Zabezpieczenie przed undefined - zainicjuj brakujące umiejętności
  useEffect(() => {
    skills.forEach((skill) => {
      const storeKey = skillKeyMap[skill.skillName];
      if (storeKey && !character.skills?.basic?.[storeKey]) {
        updateCharacter(["skills", "basic", storeKey], {
          value: 0,
          prof: false,
          skillModifier: skill.skillModifyer,
        });
      }
    });
  }, [character.skills, skills, updateCharacter]);

  let stat: number = 1;
  const [uniqSkills, setUniqSkills] = useState<Skills[]>([]);

  const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const newSkill: Skills = {
      skillName: form.skillName.value,
      skillModifyer: form.skillModifyer.value,
    };
    setUniqSkills([...uniqSkills, newSkill]);
    form.reset();
  };

  // Funkcja pomocnicza do bezpiecznego pobierania danych umiejętności
  const getSkillData = (storeKey: string) => {
    return (
      character.skills?.basic?.[storeKey] || {
        value: 0,
        prof: false,
        skillModifier: "STR",
      }
    );
  };

  return (
    <div className="border-2 flex border-black w-90 rounded-2xl h-85">
      <div className="float-left h-84 border-black w-45 border-r">
        <div className="overflow-y-auto px-2 pb-1">
          {skills.map((i: Skills, index) => {
            const storeKey = skillKeyMap[i.skillName];
            const skillData = getSkillData(storeKey);

            return (
              <label
                key={index}
                className="flex items-center gap-1 cursor-pointer py-1"
              >
                <input
                  type="checkbox"
                  checked={skillData.prof || false}
                  onChange={(e) => {
                    updateCharacter(
                      ["skills", "basic", storeKey, "prof"],
                      e.target.checked
                    );
                  }}
                  className="appearance-none w-5 h-5 border-2 border-gray-500 rounded-md cursor-pointer checked:bg-amber-500 checked:border-amber-600 transition-all duration-200 hover:border-amber-400 shadow-sm checked:before:content-['✔'] checked:before:text-white checked:before:text-sm checked:before:flex checked:before:items-center checked:before:justify-center"
                />
                <h3 className="text-md text-sm text-neutral-700 select-none">
                  {i.skillName}
                </h3>
                <div className="flex-1 flex justify-end">
                  <input
                    type="text"
                    value={skillData.value || 0}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      updateCharacter(
                        ["skills", "basic", storeKey, "value"],
                        value
                      );
                    }}
                    className="w-5 border-b"
                  />
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div className="float-right h-84 w-45 border-l border-black flex flex-col justify-between">
        <div className="overflow-y-auto px-2">
          {uniqSkills.map((i: Skills, index) => (
            <div key={index} className="flex justify-between items-center py-1">
              <span className="flex-1">{i.skillName}</span>
              <div className="flex items-center w-16 justify-between">
                <span>{stat > 0 ? `+${stat}` : stat || 0}</span>
                <span className="text-gray-600">{i.skillModifyer}</span>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleAddSkill}
          className="flex justify-center items-center mt-auto p-2"
        >
          <input
            type="text"
            name="skillName"
            placeholder="Add Skill"
            className="placeholder:text-gray-400 placeholder:text-sm border-b-2 border-amber-600 w-18"
          />
          <select
            name="skillModifyer"
            className="mx-1 w-12 px-2 bg-transparent text-gray-800 border-b-2 border-amber-600 focus:outline-none focus:border-amber-700 appearance-none"
          >
            {stats.map((stat, index) => (
              <option
                key={index}
                value={stat}
                className="border-none hover:bg-amber-700 bg-[#f4ecd4]"
              >
                {stat}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-7 h-7 items-center hover:bg-amber-700 justify-center flex bg-amber-600 rounded-md"
          >
            <IoMdAdd size={20} color="white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CHSkill;
