import { useState } from "react";
import { StatProps } from "../../types/props";

const CHStatHolder = ({ statsName, numberOfInputs }: StatProps) => {
  const [values] = useState<Array<number>>(Array(numberOfInputs).fill(0));

  return (
    <div className="border-2 w-80  mb-3 h-40 flex flex-col border-black rounded-xl p-1 space-y-4">
      {/* Górny wiersz */}
      <div className="flex justify-between items-center w-full">
        {/* Lewa strona */}
        <h1 className="uppercase text-xl">{statsName}</h1>

        {/* Prawa strona — wszystkie inputy obok siebie */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="border-b-2 text-center p-1 text-xl h-10 w-14 border-amber-600"
          />
          <input
            type="text"
            className="border-b-2 text-center p-1 text-xl h-10 w-14 border-amber-600"
          />
          {/* Możesz dodać więcej inputów — zawsze będą po prawej */}
        </div>
      </div>

      {/* Dolny wiersz — dynamiczny układ inputów */}
      <div
        className={[
          "flex items-center space-x-6",
          numberOfInputs > 2 ? "justify-between " : "space-x-12 justify-center",
        ].join(" ")}
      >
        {Array.from({ length: numberOfInputs }).map((_, index) => (
          <input
            key={index}
            value={values[index]}
            type="text"
            className="border-b-2 text-center p-1 text-md h-10 w-8 border-amber-600"
          />
        ))}
      </div>
    </div>
  );
};

export default CHStatHolder;
