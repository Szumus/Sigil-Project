import { useState,useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import "../css/CHProf.css"; // Import stylów scrollbara


interface CHProfProps {

  onChangeData?: (languages: string[], profArr: string[]) => void;
}


const CHProf: React.FC<CHProfProps> = ({onChangeData}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [lan, setLan] = useState<string>("");
  const [prof, setProf] = useState<string>("");
  const [profArr, setProfArr] = useState<string[]>([])


  useEffect(() => {
    if(onChangeData) onChangeData(languages, profArr);

  },[languages, profArr, onChangeData])

  const addLanguages = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lan.trim() === "") return;
    setLanguages((prev) => [...prev, lan.trim()]);
    setLan("");
  };
const addProf = (e :React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (prof.trim() === "") return;
  setProfArr((prev) => [...prev, prof.trim()]);
  setProf("");
};
 return (
    <div className="max-w-64 w-full h-60 mx-auto mt-4 border-2 border-black rounded-2xl group">
      {/* Nagłówek */}
      <div className="flex items-center justify-between border-b-2 border-black h-14 px-4">
        <h1 className="text-lg font-semibold">Języki:</h1>
        <h1 className="text-lg m-auto">Pokaż</h1>
        <TiThMenu
          onClick={() => setIsVisible(!isVisible)}
          className="text-amber-600 m-auto hover:text-3xl text-2xl transition-all duration-150 cursor-pointer"
        />
      </div>

      {/* Sekcja scrollowalna */}
      <div className="overflow-hidden h-[calc(100%-56px)]">
        <div
          className={`overflow-y-auto h-full transition-all duration-500 ease-in-out custom-scrollbar`}
        >
          {/* Panel języków z animacją wysokości */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              isVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-4 border-b-2 rounded-2xl w-full">
              <form className="flex gap-4 w-full" onSubmit={addLanguages}>
                <input
                  type="text"
                  value={lan}
                  onChange={(e) => setLan(e.target.value)}
                  className="border-b-2 w-30 border-amber-600 flex-1 text-md px-2 py-1 focus:outline-none"
                  placeholder="Dodaj znany język"
                />
                <button
                  type="submit"
                  className="w-10 h-10 shrink-0 flex items-center justify-center bg-amber-600 rounded-md hover:bg-amber-700 transition-colors"
                >
                  <IoMdAdd size={20} color="white" />
                </button>
              </form>

              <ul className="mt-4 space-y-1">
                {languages.map((i, index) => (
                  <li className="text-gray-600 text-sm flex gap-1" key={index}>
                    - <span className="first-letter:uppercase">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sekcja Biegłości z animacją pojawiania się */}
          <div
            className={`transition-all duration-500   ease-in-out transform ${
              isVisible ? "opacity-50 translate-y-2" : "opacity-100 translate-y-0"
            } p-4`}
          >
            <form className="flex justify-between" onClick={addProf}>
            <h1 className="text-lg my-auto font-semibold">Biegłości</h1>
              <input
                type="text"
                value={prof}
                className="w-20 border-amber-600 border-b-2"
                placeholder="Biegości"
                onChange={(e) => setProf(e.target.value)}
              />
              <button
                type="submit"
                className="w-7 h-7 shrink-0 mx-2 flex items-center justify-center bg-amber-600 rounded-md hover:bg-amber-700 transition-colors"
              >
                <IoMdAdd size={20} color="white" />
              </button>
            </form>
            <ul className="mt-4 space-y-1">
                {profArr.map((i, index) => (
                  <li className="text-gray-600 text-sm flex gap-1" key={index}>
                    - <span className="first-letter:uppercase">{i}</span>
                  </li>
                ))}
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CHProf;
