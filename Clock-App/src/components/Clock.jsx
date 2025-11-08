import { useState, useEffect } from "react";
import useSound from "use-sound";
import dingSound from "/public/sounds/ding.mp3";

function Clock() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [playDing] = useSound(dingSound);
  const [angle, setAngle] = useState();

  const PlayTimer = () => {
    for (let i = 1; i < 5; i++) {
      setTimeout(() => {
        playDing();
      }, i * 800);
    }
  };

  const ChangeAngle = () => {
    if (angle <= 90 && angle > 0) {
      return setAngle((prev) => prev - 1);
    } else if (angle == 0) {
      return setAngle(360);
    } else {
      return setAngle((prev) => prev + 1);
    }
  };

  const HandleTimeChange = (event) => {
    const { name, value } = event.target;
    const val = value;

    switch (name) {
      case "hours":
        setHours(val);
        break;
      case "minutes":
        if (val > 60) {
          setHours((h) => h + Math.trunc(val / 60));
          setMinutes(val % 60);
        } else {
          setMinutes(val);
        }
        break;
      case "seconds":
        if (val > 60) {
          setMinutes((m) => m + Math.trunc(val / 60));
          setSeconds(val % 60);
        } else {
          setSeconds(val);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s > 0) {
          ChangeAngle();
          return s - 1;
        }

        setMinutes((m) => {
          if (m > 0) {
            setSeconds(59);
            return m - 1;
          }
          setHours((h) => {
            if (h > 0) {
              setMinutes(59);
              setSeconds(59);
              return h - 1;
            }
            clearInterval(timer);
            setIsRunning(false);
            PlayTimer();
            return 0;
          });

          return 0;
        });

        return 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning]);

  const StartTimer = () => {
    if (seconds + minutes + hours == 0) {
      return;
    }
    playDing();
    setIsRunning(!isRunning);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (value === "" || value < 0) {
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
    <div className="w-fit h-fit m-20 items-center justify-center">
      <div className="w-120 z-0 h-120 absolute flex justify-center items-center rounded-full  bg-white/10 border   border-white/20 backdrop-blur-lg shadow-lg">
        <div className="bg-red-600/40  w-7 h-7 rounded-full"></div>
        <div
          className={`bg-black/40 rounded-2xl absolute w-5/12 h-2 origin-left ml-12 ${angle}`}
        ></div>
      </div>
      <div className="flex w-120 z-1 h-120 flex-col p-10 rounded-full text-amber-50 text-3xl justify-center items-center space-y-4">
        <div className="flex flex-row relative  space-x-10">
          <div className="flex flex-col items-center justify-center text-center border rounded-xl p-2">
            <p className="text-sm">HH</p>
            <input
              className="w-20 p-2.5 h-fit text-center"
              type="number"
              name="hours"
              onChange={HandleTimeChange}
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
              onChange={HandleTimeChange}
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
              onChange={HandleTimeChange}
              onBlur={handleBlur}
              value={seconds}
            />
          </div>
        </div>
        <div className="flex flex-col my-5">
          <button
            onClick={StartTimer}
            className="p-3 border border-white shadow-lg w-xs backdrop-blur-3xl bg-white/10 hover:bg-white/30 rounded-lg text-2xl"
          >
            {!isRunning ? "Start" : "Stop"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Clock;
