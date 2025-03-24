import CrpyptoDashboard from "./components/CrpyptoDashboard";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div className="mx-auto max-w-7xl">
      <Navbar />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path=":cryptocurrency" element={<CrpyptoDashboard />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
