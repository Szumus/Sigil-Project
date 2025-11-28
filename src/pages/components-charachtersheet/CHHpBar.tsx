import { useState } from "react";
import ToolTip from "../../components/ToolTip";
import { FaHeartCircleBolt } from "react-icons/fa6";
import { useCharacterStore } from "../../store/useCharacterStore";

const HpBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const updateCharacter = useCharacterStore((state: any) => state.updateCharacter);
  return (
    <div className="relative w-80">
      <div className="  overflow-visible  ">
        <div className="relative h-20 border-b-2 border-t-2 border-2 rounded-t-2xl border-black flex items-center justify-center">
          <div className="absolute -left-4 top-1/7 -translate-y-1/2 w-4 h-4 border-2 border-black rounded" />
          <div className="absolute -left-4 not-only:top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-black rounded " />
          <input
            type="text"
            className="border-r-2 border-black text-center w-24 text-3xl"
            placeholder="Hp Z"
            onChange={(e) =>
              updateCharacter(
                ["functionalStats", "hp", "internal", "current"],
                Number(e.target.value)
              )
            }
          />
          <input
            type="text"
            className=" w-24 border-none text-center text-3xl"
            placeholder="Hp Z"
            onChange={(e) =>
              updateCharacter(
                ["functionalStats", "hp", "internal", "max"],
                Number(e.target.value)
              )
            }
          />
        </div>
        <div>
          <div className="relative h-20 border-b-3 z-10 rounded-b-2xl border-2 border-t  border-black flex items-center justify-center">
            <div
              className="absolute -left-6 bottom-1  -translate-y-1/2 w-6 h-6 border-2 border-transparent rounded"
              onClick={() => setIsOpen(!isOpen)}
            >
              <ToolTip
                text={"HP DODATKOWE"}
                icon={
                  <span>
                    <FaHeartCircleBolt size={20} />
                  </span>
                }
              />
            </div>

            <input
              type="text"
              className="border-r-2 border-black text-center w-24 text-3xl"
              placeholder="Hp W"
              onChange={(e) =>
                updateCharacter(
                  ["functionalStats", "hp", "external", "current"],
                  Number(e.target.value)
                )
              }
            />
            <input
              type="text"
              className=" w-24 border-none text-center text-3xl"
              placeholder="Hp W"
              onChange={(e) =>
                updateCharacter(
                  ["functionalStats", "hp", "external", "max"],
                  Number(e.target.value)
                )
              }
            />
          </div>
        </div>

        <div
          className={`relative h-14 border-2 bottom-3 rounded-b-2xl border-t-0 flex items-center justify-center
    transition-all duration-250 ease-in-out
    ${
      isOpen
        ? "opacity-100 translate-y-0"
        : " opacity-0 -translate-y-10 pointer-events-none"
    }`}
        >
          <input
            type="text"
            className="border-r-2 border-black text-center w-24 text-3xl"
            placeholder="Hp D"
            onChange={(e) =>
              updateCharacter(
                ["functionalStats", "hp", "extra", "current"],
                Number(e.target.value)
              )
            }
          />
          <input
            type="text"
            className=" w-24 border-none text-center text-3xl"
            placeholder="Hp D"
            onChange={(e) =>
              updateCharacter(
                ["functionalStats", "hp", "extra", "max"],
                Number(e.target.value)
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default HpBar;
