const CHFuncStats = () => {
  return (
    <div className="space-y-4">
      {/* --- RP FULL / RP NAT + AC --- */}
      <div className="flex -ml-4 space-x-5">
        {/* RP FULL / NAT */}
        <div className="flex">
          <div className="border-2 relative top-1/9 left-0.5 rounded-md border-black w-4 h-4" />
          <div className="flex">
            <div className="border-2 border-r p-2 rounded-l-2xl border-black w-28 h-16 flex items-center justify-center">
              <input
                type="number"
                className="text-center target:border-none w-18 h-12"
                placeholder="RP FULL"
              />
            </div>
            <div className="border-2 border-l-2 p-2 rounded-r-2xl border-black w-28 h-16 flex items-center justify-center">
              <input
                type="number"
                className="text-center w-18 h-12"
                placeholder="RP NAT"
              />
            </div>
          </div>
        </div>

        {/* AC */}
        <div className="flex">
          <div className="border-2 relative top-1/9 left-0.5 rounded-md border-black w-4 h-4" />
          <div className="border-2 p-2 rounded-2xl border-black w-16 h-16 flex items-center justify-center">
            <input
              type="number"
              placeholder="AC"
              className="text-center w-11 h-12"
            />
          </div>
        </div>
      </div>

      {/* --- MP --- */}
      <div className="flex -ml-4">
        <div className="border-2 relative top-1/9 left-0.5 rounded-md border-black w-4 h-4" />
        <div className="border-2 flex w-80 h-16 rounded-2xl border-black items-center justify-center">
          <input
            type="number"
            className="w-30 h-16 text-center border-r-2  border-black text-3xl"
            placeholder="MP"
          />
          <input
            type="number"
            className="w-30 h-16 text-center border-l border-black text-3xl"
            placeholder="MP"
          />
        </div>
      </div>

      {/* --- SP --- */}
      <div className="flex -ml-4">
        <div className="border-2 relative top-1/9 left-0.5 rounded-md border-black w-4 h-4" />
        <div className="border-2 flex w-80 h-16 rounded-2xl border-black items-center justify-center">
          <input
            type="number"
            className="w-30 h-16 text-center border-r border-black pl-2 text-4xl"
            placeholder="SP"
          />
          <input
            type="number"
            className="w-30 h-16 text-center border-l border-black pl-2 text-4xl"
            placeholder="SP"
          />
        </div>
      </div>

      {/* --- SPD K / SPD S + STA R --- */}
      <div className="flex -ml-4 space-x-4">
        {/* SPD K / S */}
        <div className="flex">
          <div className="border-2 relative top-1/9 left-0.5 rounded-md border-black w-4 h-4" />
          <div className="flex">
            <div className="border-2 border-r-2 p-2 rounded-l-2xl border-black w-28 h-16 flex items-center justify-center">
              <input
                type="number"
                className="text-center w-16 h-12"
                placeholder="SPD K"
              />
            </div>
            <div className="border-2 border-l p-2 rounded-r-2xl border-black w-28 h-16 flex items-center justify-center">
              <input
                type="number"
                className="text-center w-16 h-12"
                placeholder="SPD S"
              />
            </div>
          </div>
        </div>

        {/* STA R */}
        <div className="flex">
          <div className="border-2 relative top-1/9 left-0.5 rounded-md border-black w-4 h-4" />
          <div className="border-2 p-2 rounded-2xl border-black w-16 h-16 flex items-center justify-center">
            <input
              type="number"
              placeholder="STA R"
              className="text-center w-11 h-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CHFuncStats;
