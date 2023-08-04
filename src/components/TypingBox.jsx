import { useState, useContext, useRef } from "react";
import TextSetModal from "./TextSetModal";
import { GlobalContext } from "../context/globalContext";
import "./TypingBox.css";

const TypingBox = () => {
  const [show, setShow] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [isTypingStart, setTypingStart] = useState(true);

  const {
    duration,
    setDuration,
    paragraph,
    setEvaluation,
    setFinalEvaluation,
  } = useContext(GlobalContext);

  const handleClick = () => {
    setShow((prev) => !prev);
  };
  let currentwordIndex = useRef(0);
  let interval = useRef();
  const words = paragraph.trim().split(" ");

  const startWatch = () => {
    let TotalSeconds = duration.minutes * 60 + duration.seconds;
    setTypingStart((prev) => !prev);
    interval.current = setInterval(() => {
      if (TotalSeconds <= 0 || currentwordIndex.current > words.length - 1) {
        clearInterval(interval.current);

        setDuration((prev) => {
          return {
            ...prev,
            minutes: 0,
            seconds: 0,
          };
        });
        setTypingStart((prev) => !prev);
        setFinalEvaluation((prev) => !prev);
        setCurrentWord("");
        currentwordIndex.current = 0;
        return;
      }
      const remainingMinutes = Math.floor(TotalSeconds / 60);
      const remainingSeconds = TotalSeconds % 60;

      setDuration((prev) => {
        return {
          ...prev,
          minutes: remainingMinutes,
          seconds: remainingSeconds,
        };
      });
      TotalSeconds = TotalSeconds - 1;
    }, 1000);
  };

  const handleTextArea = (event) => {
    setCurrentWord(event.target.value.trim());
  };

  const handleKeyDown = (event) => {
 
    if (event.keyCode === 32) {
      checkCorrectNessOfWord();
    }
  };

  const checkCorrectNessOfWord = () => {
    const currentWordFromParagraph = words[currentwordIndex.current];
    const spanElements = document.querySelectorAll(".Paragraph-Wrapper span")[
      currentwordIndex.current
    ];

    if (currentWordFromParagraph === currentWord) {
      spanElements.classList.add("Highlight-CorrectSpelled-Text");
      setCurrentWord("");
      currentwordIndex.current++;
    } else {
      spanElements.classList.add("Highlight-IncorrectSpelled-Text");
      setCurrentWord("");
      currentwordIndex.current++;

      setEvaluation((prev) => {
        return {
          ...prev,
          errors: prev.errors + 1,
        };
      });
    }
  };



  return (
    <>
      {show && <TextSetModal setShow={setShow} />}
      <section className="TypingBox">
        <div className="TypingBox-Wrapper">
          <textarea
            placeholder="start typing here..."
            className="TextArea"
            rows={5}
            disabled={isTypingStart}
            onChange={handleTextArea}
            onKeyDown={handleKeyDown}
            value={currentWord}
          />
        </div>
        <div className="Start-End-Button-Wrapper">
          <button
            className="Trigger-Button Trigger-Button-Text"
            onClick={handleClick}
          >
            Set Custom Text
          </button>
          <button className="Trigger-Button" onClick={startWatch} disabled={duration.minutes>0 ? false:true}>
            Start
          </button>
        </div>
      </section>
    </>
  );
};

export default TypingBox;
