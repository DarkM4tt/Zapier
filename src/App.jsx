import { BrowserRouter, Routes, Route } from "react-router-dom";
import Builder from "./pages/Builder";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
