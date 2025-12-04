import { useState } from "react";
import { GrStatusGoodSmall } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { Effect } from "../../types/types";
import Tooltips from "../../components/ToolTips";

const CHEffects = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [effects, setEffects] = useState<Effect[]>([]);
  const [filter, setFilter] = useState<"all" | "positive" | "negative">("all");
  const [showMixed, setShowMixed] = useState<boolean>(false); // checkbox "Mieszane?"

  const [formEffect, setFormEffect] = useState<Effect>({
    name: "",
    desc: "",
    isNegative: false,
    isPositive: false,
  });

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    text: string;
    x: number;
    y: number;
  }>({ visible: false, text: "", x: 0, y: 0 });

  // Obsługa zmian formularza
  const handleFormChange = (field: keyof Effect, value: string | boolean) => {
    setFormEffect({ ...formEffect, [field]: value });
  };

  // Dodawanie nowego efektu
  const handleAddEffect = () => {
    if (!formEffect.name.trim()) return;
    setEffects([...effects, { ...formEffect }]);
    setFormEffect({ name: "", desc: "", isNegative: false, isPositive: false });
    setIsVisible(false);
  };

  // Usuwanie efektu
  const handleDeleteEffect = (index: number) => {
    setEffects(effects.filter((_, i) => i !== index));
  };

  // Filtrowanie efektów z obsługą mieszanych
  const getFilteredEffects = () => {
    switch (filter) {
      case "positive":
        return effects.filter(
          (e) =>
            (e.isPositive && !e.isNegative) ||
            (showMixed && e.isPositive && e.isNegative)
        );
      case "negative":
        return effects.filter(
          (e) =>
            (e.isNegative && !e.isPositive) ||
            (showMixed && e.isPositive && e.isNegative)
        );
      default:
        return effects;
    }
  };

  return (
    <div className="mt-2 relative inline-block">
      <div className="border-2 w-80 h-80 rounded-2xl grid grid-rows-[auto_auto_1fr_auto] relative">
        {/* Header z ikonami filtrów */}
        <div className="border-b-2 p-2 flex justify-between items-end border-black gap-2">
          <div className="flex gap-2">
            <button
              title="Efekty Pozytywne"
              onClick={() => setFilter("positive")}
            >
              <GrStatusGoodSmall color="lime" />
            </button>
            <button
              title="Efekty Negatywne"
              onClick={() => setFilter("negative")}
            >
              <GrStatusGoodSmall color="red" />
            </button>
            <button title="Wszytskie efekty" onClick={() => setFilter("all")}>
              <GrStatusGoodSmall color="orange" />
            </button>
          </div>
          <label className="ml-2 flex items-center gap-1">
            <input
              type="checkbox"
              checked={showMixed}
              onChange={(e) => setShowMixed(e.target.checked)}
              className="appearance-none w-4 h-4 border-2 rounded-md cursor-pointer checked:bg-amber-600 checked:border-amber-600 transition-all duration-200 hover:border-amber-400 shadow-sm"
            />
            <span className="text-gray-500">Mieszane?</span>
          </label>
        </div>

        {/* Formularz dodawania efektu */}
        <div
          className={`transition-all border-b-2 duration-500 ease-in-out overflow-hidden ${
            isVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <form className="p-1" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={formEffect.name}
              placeholder="Efekt"
              onChange={(e) => handleFormChange("name", e.target.value)}
              className="border-b-2 appearance-none border-amber-600 w-30 m-2"
            />
            <textarea
              placeholder="Opis"
              value={formEffect.desc}
              onChange={(e) => handleFormChange("desc", e.target.value)}
              className="border-b-2 focus:outline-none max-h-15 border-amber-600 w-50 m-2"
            />
            <br />
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <label className="font-bold mr-1">Negatywny?</label>
                <input
                  type="checkbox"
                  checked={formEffect.isNegative}
                  onChange={(e) =>
                    handleFormChange("isNegative", e.target.checked)
                  }
                  className="appearance-none w-4 h-4 border-2 rounded-md cursor-pointer checked:bg-red-600 checked:border-red-600 transition-all duration-200 hover:border-amber-400 shadow-sm"
                />
                <label className="font-bold mr-1">Pozytywny?</label>
                <input
                  type="checkbox"
                  checked={formEffect.isPositive}
                  onChange={(e) =>
                    handleFormChange("isPositive", e.target.checked)
                  }
                  className="appearance-none w-4 h-4 border-2 rounded-md cursor-pointer checked:bg-green-600 checked:border-green-600 transition-all duration-200 hover:border-amber-400 shadow-sm"
                />
              </div>
              <button
                type="button"
                onClick={handleAddEffect}
                className="w-7 h-7 items-center hover:bg-amber-700 justify-center flex bg-amber-600 rounded-md"
              >
                <IoMdAdd size={20} color="white" />
              </button>
            </div>
          </form>
        </div>

        {/* Lista efektów */}
        <div className="p-2 overflow-y-auto">
          {getFilteredEffects().map((effect, index) => (
            <div
              key={index}
              className="border-b-2 flex mb-1 p-1 flex-col space-y-1"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-bold">{effect.name}</span>
                  <p
                    className="truncate max-w-[200px] cursor-pointer"
                    onMouseEnter={(e) =>
                      setTooltip({
                        visible: true,
                        text: effect.desc,
                        x: e.clientX,
                        y: e.clientY,
                      })
                    }
                    onMouseLeave={() =>
                      setTooltip({ ...tooltip, visible: false })
                    }
                  >
                    {effect.desc.length > 30
                      ? effect.desc.slice(0, 30) + "..."
                      : effect.desc}
                  </p>
                  <div className="flex gap-2">
                    {effect.isNegative && (
                      <span className="text-red-600">Negatywny</span>
                    )}
                    {effect.isPositive && (
                      <span className="text-green-600">Pozytywny</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteEffect(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center">
          <h1>Efekty specjalne</h1>
        </div>
      </div>

      {/* Tooltip */}
      <Tooltips
        visible={tooltip.visible}
        text={tooltip.text}
        x={tooltip.x}
        y={tooltip.y}
        what="efektu"
      />

      {/* Przycisk plus */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        type="button"
        className="absolute -left-7 top-6 transform -translate-y-1/2 w-7 h-7 flex justify-center items-center bg-amber-600 rounded-md hover:bg-amber-700"
      >
        <IoMdAdd size={20} color="white" />
      </button>

      {/* Przycisk edytuj */}
      <button
        title="Edit"
        className="absolute -left-7 top-10 w-7 h-7 flex justify-center items-center bg-amber-600 hover:bg-amber-700 rounded-md"
      >
        <MdEdit size={20} color="white" />
      </button>
    </div>
  );
};

export default CHEffects;
