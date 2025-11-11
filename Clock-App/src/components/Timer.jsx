import { useState, useEffect } from "react";
import useSound from "use-sound";
import dingSound from "/public/sounds/ding.mp3";
import { motion } from "motion/react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [playDing] = useSound(dingSound);
  const [angle, setAngle] = useState(0);

  const PlayTimer = () => {
    for (let i = 1; i < 5; i++) {
      setTimeout(() => {
        playDing();
      }, i * 800);
    }
  };

  useEffect(() => {
    if (!isRunning) return setAngle(0);

    const interval = setInterval(() => {
      {
        setAngle((prev) => prev + 36);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning]);

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
    <div className="w-fit h-fit  flex flex-col items-center justify-center">
      {/* Clock circle */}
      <div className="w-80 h-80 rounded-full relative flex flex-row items-center justify-center  bg-white/10 border border-white/20 backdrop-blur-lg shadow-lg">
        <div className="bg-neutral-600 border-2 ml-1 bottom-1/2 left-1/2 border-red-600/50  z-40 w-6 h-6 rounded-full"></div>
        <motion.div
          className=" w-1 bottom-1/2 left-1/2 z-10 absolute  h-30 border border-red-600/50 origin-bottom rounded-full"
          animate={{ rotate: angle }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Controls below clock */}
      <div className="flex flex-col p-10 rounded-xl absolute text-amber-50 text-sm justify-center items-center space-y-2 mt-0">
        <div className="flex flex-row space-x-10">
          {/* Inputs */}
          <div className="flex flex-col items-center  justify-center text-center border rounded-xl p-2">
            <p className="text-sm">HH</p>
            <input
              className="w-8 p-2 h-fit text-center"
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
              className="w-8 p-2 h-fit text-center"
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
              className="w-8 p-2 h-fit text-center"
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
            className="p-3 border border-white shadow-lg w-3xs backdrop-blur-3xl bg-white/10 hover:bg-white/30 rounded-lg text-md"
          >
            {!isRunning ? "Start" : "Stop"}
          </button>
        </div>
      </div>
    </div>
  );
}
