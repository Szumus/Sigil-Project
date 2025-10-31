import Card from "../components/Card";
import characterImg from "../assets/chaimg.png";
import dice from "../assets/dice.png";

const Lobby = () => {
  const handlelog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Creating new character card");
    // Add your logic here
  };
  return (
    <div>
      <h1 className="flex justify-center items-center p-6 font-bold text-4xl">
        Choose your destiny!
      </h1>
      <div className="flex-wrap flex justify-center items-center min-h-100 ">
        <Card
          title="Charchter Creator"
          desc="Tu zaprojektujesz nową karte postaci! Gotowy?"
          img={characterImg}
          arrow={handlelog}
        />
        <Card
          title="Created Characters"
          desc="Zagraj jedną ze swoich stworzonych postaci!"
          img={characterImg}
          arrow={handlelog}
        />
        <Card
          title="Dice Roller"
          desc="Wykonaj szybkie rzuty kośćmi!"
          img={dice}
          arrow={handlelog}
        />
      </div>
    </div>
  );
};

export default Lobby;
