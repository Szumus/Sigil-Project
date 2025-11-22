import Header from "./components-charachtersheet/CHHeader";
import HpBar from "./components-charachtersheet/CHHpBar";
import FuncStats from "./components-charachtersheet/CHFuncStats";
import CHSkill from "./components-charachtersheet/CHSkill";
import CHStats from "./components-charachtersheet/CHStats";
import { useCharacterStore } from "../store/useCharacterStore";

const CreateCharachter = () => {
  const getCharacter = useCharacterStore((state) => state.getCharacter);
  const handleSave = () => {
    console.log(getCharacter());
  };
  return (
    <div className="px-12 py-2 justify-center items-center">
      <div className="  flex  mb-4 justify-center items-center">
        <Header />
      </div>
      <div className="float-left">
        <HpBar />
        <FuncStats />
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
        Log Character
      </button>
    </div>
  );
};

export default CreateCharachter;
