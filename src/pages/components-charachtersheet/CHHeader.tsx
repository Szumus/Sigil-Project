const Header = () => {
  return (
    <div className="flex items-center ">
      <form className="flex flex-wrap px-10 items-center space-x-4 ">
        <input
          type="text"
          placeholder="Imię"
          name="name"
          className="border-2 rounded-b-sm rounded-t-lg h-10 p-2 w-72"
        />
        <input
          type="text"
          name="race"
          placeholder="Rasa"
          className="border-2 rounded-b-sm rounded-t-lg h-10 p-2 w-62"
        />
        <input
          type="text"
          placeholder="Klasa"
          name="class"
          className="border-2 rounded-b-sm rounded-t-lg h-10 p-2 w-32"
        />
        <div className="flex items-center border-2 rounded-b-sm rounded-t-lg overflow-hidden h-10 w-42">
          <span className="px-2 text-gray-700 text-sm">Lvl</span>
          <input
            type="text"
            name="level"
            className="flex-1 border-l-2 px-2 outline-none h-full"
          />
        </div>
        <div className="flex items-center border-2 rounded-b-sm rounded-t-lg overflow-hidden h-10 w-42">
          <span className="px-2 text-gray-700 text-sm">Ranga</span>
          <input
            type="text"
            name="ranga"
            className="flex-1 border-l-2 px-2 outline-none h-full"
          />
        </div>
      </form>
    </div>
  );
};

export default Header;
