import attack from "../../assets/icons/atkBon.png";
import magAtc from "../../assets/icons/magAttack.png";
import perk from "../../assets/icons/perAttack.png";
import evasion from "../../assets/icons/evasion.png";

const CHQuick = () => {
  return (
    <div className="mx-2">
      <div className="border-2 border-black h-85 w-90 rounded-2xl">
        <div className="float-left w-60">
          <textarea
            placeholder="Wpisz rzeczy które chcesz mieć pod ręką"
            name=""
            id=""
            className="w-60 min-h-80 max-h-80  border-2 p-2 text-sm rounded-xl m-2 focus:outline-none"
          />
        </div>
        <div className="float-right w-max">
          <div className="w-24 h-10 border-2 flex justify-end  items-center rounded-lg mb-5 mt-8 mx-2">
            <img className="w-8 h-8" src={attack} />
            <input
              type="text"
              className="w-10 m-2 border-amber-600 border-b-2 "
            />
          </div>
          <div className="w-24 h-10 border-2 flex justify-end  items-center rounded-lg mb-5 mt-8 mx-2">
            <img className="w-8 h-8" src={magAtc} />
            <input
              type="text"
              className="w-10 m-2 border-amber-600 border-b-2 "
            />
          </div>
          <div className="w-24 h-10 border-2 flex justify-end  items-center rounded-lg mb-5 mt-8 mx-2">
            <img className="w-8 h-8" src={perk} />
            <input
              type="text"
              className="w-10 m-2 border-amber-600 border-b-2 "
            />
          </div>
          <div className="w-24 h-10 border-2 flex justify-end  items-center rounded-lg mb-5 mt-8 mx-2">
            <img className="w-8 h-8" src={evasion} />
            <input
              type="text"
              className="w-10 m-2 border-amber-600 border-b-2 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CHQuick;
