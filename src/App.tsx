import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Lobby from "./pages/Lobby";

import CreateCharachter from "./pages/CreateCharachter";
import RollDice from "./pages/RollDice";
import FinalCharachter from "./pages/FinalCharachter";
import CombatPanel from "./pages/CombatPanel";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/charachter-creator" element={<CreateCharachter />} />
          <Route path="/roll" element={<RollDice />} />
          <Route path="/final-charachter" element={<FinalCharachter />} />
          <Route path="/combat-panel" element={<CombatPanel />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
