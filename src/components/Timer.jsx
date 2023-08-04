import { useState, useContext, useRef } from "react";
import { GlobalContext } from "../context/globalContext";
import TimerSetModal from "./TimerSetModal";
import "./Timer.css";

const Timer = () => {
  const [show, setShow] = useState(false);
  const { duration, setDuration } = useContext(GlobalContext);
  const optionsRef = useRef();

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  const handleTime = (event) => {

    if (event.target.dataset.hasOwnProperty("time")) {
      const time = parseInt(event.target.dataset["time"]) * 60 * 1000;
      const totalSeconds = Math.floor(time / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      const NonActiveChildren = [...optionsRef.current.childNodes];
      NonActiveChildren.forEach((element) => {
        if (element.classList.contains("Active")) {
          element.classList.remove("Active");
        }
      });
        setDuration((prev) => {
          return {
            ...prev,
            minutes: minutes,
            seconds: seconds,
          };
        });
      event.target.classList.add("Active");
    }
  };

  return (
    <>
      {show && <TimerSetModal setShow={setShow} />}
      <section className="Timer">
        <div className="Timer-Wrapper">
          <div className="Timer-Options" ref={optionsRef} onClick={handleTime}>
            <p className="Active Duration" data-time="1">
              1m
            </p>
            <p className="Duration" data-time="3">
              3m
            </p>
            <p className="Duration" data-time="5">
              5m
            </p>
            <button className="Custom-Duration" onClick={handleClick}>
              Set Time
            </button>
          </div>

          <div className="Timer-Tracker">
            <p className={duration.seconds<=10 && duration.minutes === 0 ? "Timer-Tracker-Data Hour-Minute Time-End" :"Timer-Tracker-Data Hour-Minute"}>
              <span className="Hour">
                {String(duration.minutes).padStart(2, 0)}
              </span>
              :
              <span className="Minute">
                {String(duration.seconds).padStart(2, 0)}
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Timer;
