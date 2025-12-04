import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

interface EquipmentItem {
  name: string;
  quantity: number;
  type: string;
  description: string;
  isOpen: boolean;
}

const CHEquipment = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [eq, setEq] = useState<EquipmentItem[]>([]);
  const [itemName, setItemName] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [itemType, setItemType] = useState<string>("BROŃ");
  const [itemDescription, setItemDescription] = useState<string>("");

  const types = [
    "BROŃ",
    "PANCERZ",
    "MIKSTURA",
    "PIENIĄDZE",
    "MAGICZNE PRZEDMIOTY",
    "INNE",
  ];

  const addEq = () => {
    if (itemName.trim() === "" || itemQuantity <= 0) return;

    const newItem: EquipmentItem = {
      name: itemName.trim(),
      quantity: itemQuantity,
      type: itemType,
      description: itemDescription,
      isOpen: false,
    };

    setEq((prev) => [...prev, newItem]);

    setItemName("");
    setItemQuantity(1);
    setItemType("BROŃ");
    setItemDescription("");
  };

  const updateQuantity = (index: number, quantity: number) => {
    const newEq = [...eq];
    if (quantity <= 0) {
      newEq.splice(index, 1);
    } else {
      newEq[index].quantity = quantity;
    }
    setEq(newEq);
  };

  const removeItem = (index: number) => {
    const newEq = [...eq];
    newEq.splice(index, 1);
    setEq(newEq);
  };

  const toggleItem = (index: number) => {
    const newEq = [...eq];
    newEq[index].isOpen = !newEq[index].isOpen;
    setEq(newEq);
  };

  return (
    <div className="mt-2 mx-2">
      <div className="border-2 p-2 overflow-auto border-black w-90 h-339 rounded-2xl">
        {/* Nagłówek */}
        <div className="flex items-center">
          <button
            type="button"
            className="w-7 h-7 flex justify-center items-center bg-amber-600 rounded-md hover:bg-amber-700"
            onClick={() => setIsVisible(!isVisible)}
          >
            <FaChevronDown size={20} color="white" />
          </button>
          <h1 className="font-bold mx-auto">Ekwipunek</h1>
        </div>

        {/* Formularz dodawania */}
        <div
          className={`transition-all border-b-2 rounded-2xl duration-500 ease-in-out overflow-hidden ${
            isVisible ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-wrap items-center mt-2">
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="m-2 border-b-2 border-amber-600 w-45"
              placeholder="Nazwa Przedmiotu"
            />
            <input
              type="number"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(Number(e.target.value))}
              min={1}
              className="m-2 border-b-2 border-amber-600 w-15"
              placeholder="Ilość"
            />
            <select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              className="m-2 w-30 border-b-2 border-amber-600 px-2 bg-transparent text-gray-800 focus:outline-none focus:border-amber-700"
            >
              {types.map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <textarea
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="w-full max-h-32 border-b-2 border-amber-600 m-2 outline-none"
              placeholder="Opis przedmiotu"
            ></textarea>
            <button
              type="button"
              onClick={addEq}
              className="w-10 h-10 flex items-center justify-center bg-amber-600 hover:bg-amber-700 rounded-md m-2"
            >
              <IoMdAdd size={20} color="white" />
            </button>
          </div>
        </div>

        {/* Lista przedmiotów */}
        <div className="mt-2 flex flex-col gap-2">
          {eq.map((i, index) => (
            <div key={index} className="border rounded-lg p-2 flex flex-col ">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleItem(index)}
              >
                <span className="text-lg   font-medium wrap-break-words flex-1">
                  {i.name}
                </span>
                <span>{i.type}</span>
                {/* Ilość widoczna przed rozwinięciem */}
                <span className="ml-2 font-semibold">
                  {i.quantity > 1 ? `x${i.quantity}` : ""}
                </span>
              </div>

              {/* Panel rozwijany */}
              {i.isOpen && (
                <div className="mt-2 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <label className="w-20">Ilość:</label>
                    <input
                      type="number"
                      value={i.quantity}
                      onChange={(e) =>
                        updateQuantity(index, Number(e.target.value))
                      }
                      className="border-b-2 border-amber-600 w-20 text-center"
                      min={0}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-20">Typ:</label>
                    <span className="text-gray-800">{i.type}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Opis:</label>
                    <textarea
                      value={i.description}
                      onChange={(e) => {
                        const newEq = [...eq];
                        newEq[index].description = e.target.value;
                        setEq(newEq);
                      }}
                      className="border-b-2 border-amber-600 outline-none w-full"
                    ></textarea>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="mt-2 text-red-600 font-bold px-2 py-1 border border-red-600 rounded hover:bg-red-600 hover:text-white w-24"
                  >
                    Usuń
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CHEquipment;
