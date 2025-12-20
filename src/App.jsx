import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Builder from "./pages/Builder";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/builder" replace />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
