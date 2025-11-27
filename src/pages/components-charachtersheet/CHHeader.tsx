import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { useCharacterStore } from "../../store/useCharacterStore"
import { useNavigate } from "react-router-dom"

// Stylowany MessageBox
const CustomMessageBox = ({
  message,
  cancleMessage,
  okMessage,
  onClose,
  onConfirm,
}: {
  message: string
  cancleMessage: string
  okMessage: string
  onClose: () => void
  onConfirm: () => void
}) => {
  return (
    <>
      {/* Overlay z niższym z-index */}
      <div className="fixed inset-0 backdrop-blur-md z-20" />
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none">
        <div className="bg-white rounded-xl shadow-lg p-6 w-96 pointer-events-auto">
          <h2 className="text-xl font-bold mb-4">Informacja</h2>
          <p className="mb-6">{message}</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              {cancleMessage}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition"
            >
              {okMessage}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const Header = () => {
  const updateCharacter = useCharacterStore(
    (state: any) => state.updateCharacter
  )
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => setShowModal(true)
  const handleConfirm = () => {
    setShowModal(false)
    navigate("/lobby")
  }
  const handleCancel = () => setShowModal(false)

  return (
    <div className="w-full px-4 relative z-40">
      <form className="flex justify-between w-full items-center">
        <button
          type="button"
          onClick={handleClick}
          className="text-white bg-amber-600 hover:bg-amber-700 duration-100 rounded-full h-10 w-10"
        >
          <FaArrowLeft color="white" className="m-auto hover:text-2xl duration-350" />
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
  )
}

export default Header
