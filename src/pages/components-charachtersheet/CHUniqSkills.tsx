import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import CustomMessageBox from "../../components/MessegeBox";
import { useCharacterStore } from "../../store/useCharacterStore";

type SkillStat = {
  type: string;
  customType: string;
  cost: string;
};

type Skill = {
  id: number;
  name: string;
  description: string;
  cost: string;
};

const CHUniqSkills = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // ✅ ZUSTAND
  const { character, updateCharacter } = useCharacterStore();
  const skills = (character.uniqSkills as Skill[]) || [];

  // INPUTY NOWEGO SKILLA
  const [skillName, setSkillName] = useState("");
  const [skillDesc, setSkillDesc] = useState("");

  const [stats, setStats] = useState<SkillStat[]>([
    { type: "MANA", customType: "", cost: "" },
  ]);

  // POTWIERDZENIE USUWANIA
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const typeOptions = ["MANA", "STA", "HP Z", "HP W", "INNE"];

  // DODAWANIE KOLEJNEGO KOSZTU (MAX 3)
  const addStat = () => {
    if (stats.length >= 3) return;
    setStats([...stats, { type: "MANA", customType: "", cost: "" }]);
  };

  const updateType = (index: number, value: string) => {
    const newStats = [...stats];
    newStats[index].type = value;
    setStats(newStats);
  };

  const updateCustomType = (index: number, value: string) => {
    const newStats = [...stats];
    newStats[index].customType = value;
    setStats(newStats);
  };

  const updateCost = (index: number, value: string) => {
    const newStats = [...stats];
    newStats[index].cost = value;
    setStats(newStats);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  // ✅ ZAPIS NOWEGO SKILLA → ZUSTAND
  const addSkill = () => {
    if (!skillName || !skillDesc) {
      alert("Uzupełnij nazwę i opis!");
      return;
    }

    const costString = stats
      .map((s) =>
        s.type === "INNE" ? `${s.cost} ${s.customType}` : `${s.cost} ${s.type}`
      )
      .join(", ");

    const newSkill: Skill = {
      id: Date.now(),
      name: skillName,
      description: skillDesc,
      cost: costString,
    };

    const updated = [...skills, newSkill];
    updateCharacter(["uniqSkills"], updated);

    // RESET FORMULARZA
    setSkillName("");
    setSkillDesc("");
    setStats([{ type: "MANA", customType: "", cost: "" }]);
  };

  // ✅ USUWANIE SKILLA → ZUSTAND
  const deleteSkill = () => {
    if (!skillToDelete) return;

    const updated = skills.filter((s) => s.id !== skillToDelete.id);
    updateCharacter(["uniqSkills"], updated);

    setSkillToDelete(null);
    setShowConfirm(false);
  };

  return (
    <div className="mt-2  relative">
      <div className="border-2 p-2 overflow-auto border-black w-95 h-339 rounded-2xl">
        <div className="flex">
          <button
            type="button"
            className="w-7 h-7 flex justify-center items-center bg-amber-600 rounded-md hover:bg-amber-700"
            onClick={() => setIsVisible(!isVisible)}
          >
            <FaChevronDown size={20} color="white" />
          </button>
          <h1 className="font-bold mx-auto">Umiejętności specjalne</h1>
        </div>

        <div
          className={`transition-all border-b-2 rounded-2xl duration-500 ease-in-out overflow-hidden ${
            isVisible ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-2">
            <div className="flex space-x-2">
              {/* LEWA STRONA */}
              <div className="flex-1">
                <input
                  type="text"
                  className="appearance-none border-b-2 px-2 border-amber-600 w-48"
                  placeholder="Nazwa Skilla"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                />

                <textarea
                  className="outline-none mt-2 min-h-32 max-h-full border-2 text-sm w-full rounded-2xl px-2 border-black"
                  placeholder="Opis Skilla i obrażenia"
                  value={skillDesc}
                  onChange={(e) => setSkillDesc(e.target.value)}
                />
              </div>

              {/* PRAWA STRONA – KOSZTY */}
              <div className="flex-3 border rounded-2xl p-1">
                {stats.map((stat, index) => (
                  <div key={index} className="mb-4 border w-30 p-2 rounded-xl">
                    <select
                      value={stat.type}
                      onChange={(e) => updateType(index, e.target.value)}
                      className="w-24 px-2 bg-transparent border-b-2 border-amber-600"
                    >
                      {typeOptions.map((s, i) => (
                        <option key={i} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    {stat.type === "INNE" && (
                      <input
                        type="text"
                        className="mt-2 px-2 border-b-2 border-amber-600 w-full"
                        placeholder="Własny typ"
                        value={stat.customType}
                        onChange={(e) =>
                          updateCustomType(index, e.target.value)
                        }
                      />
                    )}

                    <input
                      type="number"
                      className="mt-2 border-b-2 w-15 border-amber-600"
                      placeholder="Koszt"
                      value={stat.cost}
                      onChange={(e) => updateCost(index, e.target.value)}
                    />
                  </div>
                ))}

                <button
                  type="button"
                  className={`text-sm text-white rounded-md px-2 py-1 ${
                    stats.length >= 3
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-amber-600 hover:bg-amber-700"
                  }`}
                  onClick={addStat}
                  disabled={stats.length >= 3}
                >
                  Dodaj koszt
                </button>
              </div>
            </div>

            {/* ZAPIS NOWEGO SKILLA */}
            <button
              onClick={addSkill}
              className="text-lg my-2 w-full h-10 text-white flex justify-center items-center bg-green-600 rounded-md hover:bg-green-700"
            >
              <MdAdd size={20} />
              Zapisz Skilla
            </button>
          </div>
        </div>

        {/* LISTA SKILLI */}
        {skills.map((skill) => {
          const shortDesc =
            skill.description.length > 20
              ? skill.description.slice(0, 20) + "..."
              : skill.description;

          return (
            <div key={skill.id} className=" mt-2 rounded-lg mb-2 p-2 ">
              <div className="flex justify-between items-start cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold wrap-break-word">
                    {skill.name}
                  </div>
                  <div className="text-sm text-gray-700 wrap-break-word whitespace-pre-wrap">
                    {isExpanded ? skill.description : shortDesc}
                  </div>
                </div>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center px-2 py-1 text-sm  bg-amber-600 text-white rounded hover:bg-amber-700 ml-2 shrink-0"
                >
                  {isExpanded ? (
                    <FaChevronDown className="rotate-0 duration-150" />
                  ) : (
                    <FaChevronDown className="rotate-180 duration-150" />
                  )}
                </button>
              </div>

              {isExpanded && (
                <div className="mt-2 flex justify-between items-center flex-wrap">
                  <div className="font-bold text-amber-700 wrap-break-words whitespace-pre-wrap max-w-full">
                    {skill.cost}
                  </div>
                  <button
                    onClick={() => {
                      setSkillToDelete(skill);
                      setShowConfirm(true);
                    }}
                    className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    usuń
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ✅ CustomMessageBox */}
      {showConfirm && skillToDelete && (
        <CustomMessageBox
          message={`Czy na pewno chcesz usunąć skilla "${skillToDelete.name}"?`}
          cancleMessage="Anuluj"
          okMessage="Usuń"
          onClose={() => setShowConfirm(false)}
          onConfirm={deleteSkill}
        />
      )}
    </div>
  );
};

export default CHUniqSkills;
