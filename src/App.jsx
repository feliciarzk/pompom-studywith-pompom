import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;