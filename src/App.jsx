import { Routes, Route } from "react-router-dom";

import { SoundProvider } from "./context/SoundContext";

import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";

function App() {
  return (
    <SoundProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </SoundProvider>
  );
}

export default App;