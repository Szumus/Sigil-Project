import { useState } from "react";
import Header from "./components-charachtersheet/CHHeader";
import HpBar from "./components-charachtersheet/CHHpBar";
import FuncStats from "./components-charachtersheet/CHFuncStats";
import CHSkill from "./components-charachtersheet/CHSkill";
import CHStats from "./components-charachtersheet/CHStats";
import CHProf from "./components-charachtersheet/CHProf";
import { useCharacterStore } from "../store/useCharacterStore";
import CHState from "./components-charachtersheet/CHState";

const CreateCharachter = () => {
  const updateCharacter = useCharacterStore((state:any) => state.updateCharacter);
  const getCharacter = useCharacterStore((state) => state.getCharacter);

  const [languages, setLanguages] = useState<string[]>([]);
  const [profArr, setProfArr] = useState<string[]>([]);

  const handleSave = () => {
    updateCharacter(["languages"], languages);
    updateCharacter(["proficiencies"], profArr);
    console.log(getCharacter());
  };


  

  return (
    <div className="px-12 py-2 justify-center items-center">
      <div className="flex mb-4 justify-center items-center">
        <Header />
      </div>
      <div className="float-left ">
        <HpBar />
        <FuncStats />
        
        <CHProf onChangeData={(langs, profs) => { 
  setLanguages(langs); 
  setProfArr(profs); 
}} />
<CHState/>

      </div>
      <div className="float-left ml-2">
        <CHSkill />
      </div>
      <div className="float-right">
        <CHStats />
      </div>

      <button
        className="mt-6 p-2 bg-blue-600 text-white rounded"
        onClick={handleSave}
      >
        Zapisz
      </button>
    </div>
  );
};

export default CreateCharachter;
