import { useNavigate } from "react-router-dom";
import { CardProps } from "../types/props";
import { FaArrowLeft } from "react-icons/fa";

const Card = ({ title, desc, img, path }: CardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  return (
    <div className="relative m-10 rounded-xl shadow-2xl h-50 w-80 bg-white flex">
      {/* lewy panel */}
      <div className="flex flex-col flex-1 p-3">
        <div>
          <h1 className="font-bold first-letter:uppercase">{title}!</h1>
          <span className="text-[12px] text-neutral-700 block">{desc}</span>
        </div>

        {/* przycisk w lewym dolnym rogu */}
        <button
          onClick={handleClick}
          className=" bg-amber-600 rounded-full absolute bottom-3 left-3 text-black text-md p-1 text-center hover:bg-amber-700 transition"
        >
          <FaArrowLeft
            color="white"
            className="inline relative -top-0.5 left-0.5 mr-2 size-5 "
          />
        </button>
      </div>

      {/* obrazek */}
      <div className="shrink-0">
        <img
          src={img}
          alt="card image"
          className="h-50 w-40 object-cover rounded-r-xl"
        />
      </div>
    </div>
  );
};

export default Card;
