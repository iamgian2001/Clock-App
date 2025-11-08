import { useState, useEffect } from "react";

function Clock() {
  const [seconds, setSeconds] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [hours, setHours] = useState("0");
  const [isRunning, setIsRunning] = useState(false);

  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    const val = value === "" ? "" : Number(value);

    switch (name) {
      case "hours":
        setHours(val);
        break;
      case "minutes":
        setMinutes(val);
        break;
      case "seconds":
        setSeconds(val);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s > 0) return s - 1;
        clearInterval(timer);
        setIsRunning(false);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const StartTimer = () => setIsRunning(true);

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (value === "") {
      switch (name) {
        case "hours":
          setHours(0);
          break;
        case "minutes":
          setMinutes(0);
          break;
        case "seconds":
          setSeconds(0);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-120 h-120 bg-slate-900 flex-col p-10 rounded-full text-amber-50 text-3xl justify-center items-center space-y-4">
        <div className="flex flex-row  space-x-10">
          <div className="flex flex-col items-center justify-center text-center border rounded-xl p-2">
            <p className="text-sm">HH</p>
            <input
              className="w-20 p-2.5 h-fit text-center"
              type="number"
              name="hours"
              onChange={handleTimeChange}
              onBlur={handleBlur}
              value={hours}
            />
          </div>
          <div className="flex flex-col items-center justify-center text-center border rounded-xl p-2">
            <p className="text-sm">MM</p>
            <input
              className="w-20 p-2.5 h-fit text-center"
              type="number"
              name="minutes"
              onChange={handleTimeChange}
              onBlur={handleBlur}
              value={minutes}
            />
          </div>
          <div className="flex flex-col items-center justify-center text-center border rounded-xl p-2">
            <p className="text-sm">SS</p>
            <input
              className="w-20 p-2.5 h-fit text-center"
              type="number"
              name="seconds"
              onChange={handleTimeChange}
              onBlur={handleBlur}
              value={seconds}
            />
          </div>
        </div>
        <div className="flex flex-col my-5">
          <button
            onClick={StartTimer}
            className="p-3 w-xs text-blue-950 hover:bg-amber-600 bg-amber-300 rounded-lg text-2xl"
          >
            {!isRunning ? "Start" : "Stop"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Clock;
