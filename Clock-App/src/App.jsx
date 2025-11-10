import "./App.css";
import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
