import { ChangeEvent } from "react";
import { useCharacterStore } from "../store/useCharacterStore";

const ImageUpload: React.FC = () => {
  const image = useCharacterStore((state) => state.character.art);
  const updateCharacter = useCharacterStore((state) => state.updateCharacter);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        updateCharacter(["art"], reader.result as string); // ✅ POPRAWNA ŚCIEŻKA
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-2 border-2 rounded-2xl w-80 mt-2 flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="fileInput"
      />

      <label
        htmlFor="fileInput"
        className="cursor-pointer bg-amber-600 w-full text-center text-md hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        Wybierz zdjęcie
      </label>

      {image && (
        <div className="mt-4">
          <img
            src={image}
            alt="Uploaded"
            className="max-w-[280px] max-h-50 rounded-xl border shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
