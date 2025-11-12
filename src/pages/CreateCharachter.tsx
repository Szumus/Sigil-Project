import Header from "./components-charachtersheet/CHHeader";
import HpBar from "./components-charachtersheet/CHHpBar";
import FuncStats from "./components-charachtersheet/CHFuncStats";
import CHSkill from "./components-charachtersheet/CHSkill";
import CHStats from "./components-charachtersheet/CHStats";
import CHState from "./components-charachtersheet/CHState";

const CreateCharachter = () => {
  return (
    <div className="px-12 py-2 justify-center items-center">
      <div className="  flex  mb-4 justify-center items-center">
        <Header />
      </div>
      <div className="float-left">
        <HpBar />
        <FuncStats />
        <CHState />
      </div>
      <div className="float-left ml-2">
        <CHSkill />
      </div>
      <div className="float-right">
        <CHStats />
      </div>
    </div>
  );
};

export default CreateCharachter;
