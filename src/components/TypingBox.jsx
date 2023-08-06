import { useState, useContext, useRef } from "react";
import TextSetModal from "./TextSetModal";
import { GlobalContext } from "../context/globalContext";
import "./TypingBox.css";

const TypingBox = () => {
  const [show, setShow] = useState(false);
  const [currentKeyCode, setcurrentKeyCode] = useState();
  const [isTypingStart, setTypingStart] = useState(true);
  const textAreaRef = useRef();

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
  const words = paragraph.split("");

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

        if (textAreaRef.current.value !== words.join("")) {

          const originalString = words.join("").split(" ");
          const inputString = textAreaRef.current.value.split(" ");

          const incorrectWords = originalString.filter((word, index) => {
            return word !== inputString[index];
          });

          setEvaluation((prev) => {
            return {
              ...prev,
              errors: incorrectWords.length,
            };
          });
        }

        setTypingStart((prev) => !prev);
        setFinalEvaluation((prev) => !prev);
        textAreaRef.current.value = "";
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

  const handleInput = (event) => {
    if (currentKeyCode !== 8) {
      checkCorrectNessOfWord(event.target.value);
    }
  };

  const handleKeyDown = (event) => {
    setcurrentKeyCode(event.keyCode);
    if (event.keyCode === 8) {
      currentwordIndex.current--;
      const spanElements = document.querySelectorAll(".Paragraph-Wrapper span")[
        currentwordIndex.current
      ];
      spanElements.classList.remove(
        "Highlight-CorrectSpelled-Text",
        "Highlight-IncorrectSpelled-Text"
      );
    }
  };

  const checkCorrectNessOfWord = (letter) => {
    const currentWordFromParagraph = words[currentwordIndex.current];
    const spanElements = document.querySelectorAll(".Paragraph-Wrapper span")[
      currentwordIndex.current
    ];

    if(/\s/.test(letter[currentwordIndex.current])){
      currentwordIndex.current++;
    }

    else if (currentWordFromParagraph === letter[currentwordIndex.current]) {
      spanElements.classList.add("Highlight-CorrectSpelled-Text");
      currentwordIndex.current++;
    } else {
      spanElements.classList.add("Highlight-IncorrectSpelled-Text");
      currentwordIndex.current++;
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
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            ref={textAreaRef}
          />
        </div>
        <div className="Start-End-Button-Wrapper">
          <button
            className="Trigger-Button Trigger-Button-Text"
            onClick={handleClick}
          >
            Set Custom Text
          </button>
          <button
            className="Trigger-Button"
            onClick={startWatch}
            disabled={duration.minutes > 0 ? false : true}
          >
            Start
          </button>
        </div>
      </section>
    </>
  );
};

export default TypingBox;
