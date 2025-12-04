import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useCharacterStore } from "../../store/useCharacterStore";
import { useNavigate } from "react-router-dom";
import CustomMessageBox from "../../components/MessegeBox";

// Stylowany MessageBox

const Header = () => {
  const updateCharacter = useCharacterStore(
    (state: any) => state.updateCharacter
  );
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => setShowModal(true);
  const handleConfirm = () => {
    setShowModal(false);
    navigate("/lobby");
  };
  const handleCancel = () => setShowModal(false);

  return (
    <div className="w-full px-4 relative z-40">
      <form className="flex space-x-11 w-full items-center">
        <button
          type="button"
          onClick={handleClick}
          className="text-white bg-amber-600 hover:bg-amber-700 duration-100 rounded-full h-10 w-10"
        >
          <FaArrowLeft
            color="white"
            className="m-auto hover:text-2xl duration-350"
          />
        </button>

        {/* Tutaj zachowane wszystkie inputy */}
        <input
          type="text"
          placeholder="Imię"
          name="name"
          className="border-2 rounded-lg h-10 p-2 w-[20%]"
          onChange={(e) => updateCharacter(["main", "name"], e.target.value)}
        />
        <input
          type="text"
          name="race"
          placeholder="Rasa"
          className="border-2 rounded-lg h-10 p-2 w-[15%]"
          onChange={(e) => updateCharacter(["main", "race"], e.target.value)}
        />
        <input
          type="text"
          placeholder="Klasa"
          name="class"
          className="border-2 rounded-lg h-10 p-2 w-[15%]"
          onChange={(e) => updateCharacter(["main", "class"], e.target.value)}
        />
        <div className="flex items-center border-2 rounded-lg overflow-hidden h-10 w-[15%]">
          <span className="px-2 text-gray-700 text-sm">Lvl</span>
          <input
            type="text"
            name="level"
            className="flex-1 border-l-2 px-2 outline-none h-full"
            onChange={(e) =>
              updateCharacter(["main", "level"], Number(e.target.value))
            }
          />
        </div>
        <div className="flex items-center border-2 rounded-lg overflow-hidden h-10 w-[15%]">
          <span className="px-2 text-gray-700 text-sm">Ranga</span>
          <input
            type="text"
            name="ranga"
            className="flex-1 border-l-2 px-2 outline-none h-full"
            onChange={(e) => updateCharacter(["main", "rank"], e.target.value)}
          />
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <CustomMessageBox
          cancleMessage="Anuluj"
          okMessage="Utrac postep"
          message="Wyjście z tego panelu skutkuje utraceniem postepu! Jesteś pewny?"
          onClose={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Header;
