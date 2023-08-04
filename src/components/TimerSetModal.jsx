import "./Timer.css";
import { useContext, useRef } from "react";
import { GlobalContext } from "../context/globalContext";

const TimerSetModal = ({ setShow }) => {
  const { setDuration } = useContext(GlobalContext);
  const inputRef = useRef();
  const handleClick = () => {
    setShow((prev) => !prev);
  };
  const handleTimeSet = () => {
    const time = parseInt(inputRef.current.value)*60 * 1000;
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
      setDuration((prev)=>{
        return{
         ...prev,
         minutes:minutes,
         seconds:seconds
        }
      })
    inputRef.current.value = "";
    setShow((prev) => !prev);
  };

  return (
    <div className="TimerSetModal">
      <div className="TimeSetModal-Wrapper">
        <div className="TimerSetModal-Input-Wrapper">
          <input
            type="text"
            placeholder="enter time in minute eg.4"
            className="Time-Input"
            ref={inputRef}
          />
        </div>
        <div className="TimerSetModal-Set-Button-Wrapper">
          <button className="Set-Button Trigger-Button" onClick={handleTimeSet}>
            Set Time
          </button>
          <button className="Close-Set-Button" onClick={handleClick}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerSetModal;
