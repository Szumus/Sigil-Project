import { useState } from "react";
import Header from "./components-charachtersheet/CHHeader";
import HpBar from "./components-charachtersheet/CHHpBar";
import FuncStats from "./components-charachtersheet/CHFuncStats";
import CHSkill from "./components-charachtersheet/CHSkill";
import CHStats from "./components-charachtersheet/CHStats";
import CHProf from "./components-charachtersheet/CHProf";
import { useCharacterStore } from "../store/useCharacterStore";
import CHState from "./components-charachtersheet/CHState";
import CHQuick from "./components-charachtersheet/CHQuick";
import ImageUpload from "../components/ImageLoad";
import CHEffects from "./components-charachtersheet/CHEffects";
import CHEquipment from "./components-charachtersheet/CHEquipment";

const CreateCharachter = () => {
  const updateCharacter = useCharacterStore(
    (state: any) => state.updateCharacter
  );
  const getCharacter = useCharacterStore((state) => state.getCharacter);

  const [languages, setLanguages] = useState<string[]>([]);
  const [profArr, setProfArr] = useState<string[]>([]);

  const handleSave = () => {
    updateCharacter(["languages"], languages);
    updateCharacter(["proficiencies"], profArr);
    console.log(getCharacter());
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[1500px] px-2 sm:px-4 md:px-8 py-2">
        {/* HEADER */}
        <div className="flex mb-4 justify-center">
          <Header />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col xl:flex-row gap-2">
          {/* LEWA STRONA – ORYGINALNY UKŁAD */}
          <div className="flex flex-col xl:flex-row w-full gap-2">
            {/* KOLUMNA 1 – Hp + Prof itd */}
            <div className="w-full xl:w-auto">
              <HpBar />
              <FuncStats />
              <CHProf
                onChangeData={(langs, profs) => {
                  setLanguages(langs);
                  setProfArr(profs);
                }}
              />
              <CHState />
              <ImageUpload />
              <CHEffects />
            </div>

            {/* KOLUMNA 2 – Skill / Quick / Stats */}
            <div className="w-full xl:w-auto">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1">
                  <CHSkill />
                </div>
                <div className="flex-1">
                  <CHQuick />
                  <CHEquipment />
                </div>
                <div className="flex-1">
                  <CHStats />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleSave}
        >
          Zapisz
        </button>
      </div>
    </div>
  );
};

export default CreateCharachter;
