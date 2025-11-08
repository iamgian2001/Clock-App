import "./App.css";
import { Routes, Route } from "react-router";
import Clock from "./components/Clock";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Clock />}></Route>
      </Routes>
    </>
  );
}

export default App;
