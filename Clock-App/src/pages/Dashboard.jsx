import { useState } from "react";
import Clock from "../components/Clock";

export default function Dashboard() {
  const [numTimers, setNumTimers] = useState(1);

  const renderTimers = () => {
    const timers = [];
    for (let i = 0; i < numTimers; i++) {
      timers.push(<Clock key={i} />);
    }
    return timers;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-6 flex flex-row justify-between border-b-2 bg-cyan-950  z-60 fixed w-full ">
        <p className="text-white text-xl font-bold">Timer App</p>
        <button
          className="border-2 p-2 rounded-lg hover:bg-cyan-800 text-white"
          onClick={() => setNumTimers((prev) => prev + 1)}
        >
          Add a timer
        </button>
        <button
          className={`
    border-2 p-2 rounded-lg text-white
    hover:bg-cyan-800 
    ${numTimers > 1 ? "inline" : "hidden"}
  `}
          onClick={() =>
            setNumTimers((prevNumTimers) =>
              prevNumTimers > 0 ? prevNumTimers - 1 : prevNumTimers
            )
          }
        >
          Delete timers
        </button>
      </div>
      <div className="p-6 flex flex-wrap gap-4">{renderTimers()}</div>
    </div>
  );
}
