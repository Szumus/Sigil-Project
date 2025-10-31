import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Lobby from "./pages/Lobby";
import { CardProps } from "./types/props";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/lobby" element={<Lobby />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
