import Card from "../components/Card";
import characterImg from "../assets/chaimg.png";
import dice from "../assets/dice.png";
import character from "../assets/shcha.png";

const Lobby = () => {
  return (
    <div>
      <h1 className="flex justify-center items-center p-6 font-bold text-4xl">
        Choose your destiny!
      </h1>
      <div className="flex-wrap flex justify-center items-center min-h-100 ">
        <Card
          title="Charcter Creator"
          desc="Tu zaprojektujesz nową karte postaci! Gotowy?"
          img={characterImg}
          path="/charachter-creator"
        />
        <Card
          title="Dice Roller"
          desc="Wykonaj szybkie rzuty kośćmi!"
          img={dice}
          path="/roll"
        />
        <Card
          title="Created Characters"
          desc="Zagraj jedną ze swoich stworzonych postaci!"
          img={character}
          path="/final-charachter"
        />
        <Card
          title="Combat Panel"
          desc="O bogowie walka!"
          img={character}
          path="/combat-panel"
        />
      </div>
    </div>
  );
};

export default Lobby;
