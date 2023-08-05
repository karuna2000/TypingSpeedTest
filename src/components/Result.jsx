import React, { useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import "./Result.css";
import data from '../data.json'

const Result = () => {
  const { evaluation, paragraph, setFinalEvaluation, setDuration,setIndex } =
    useContext(GlobalContext);
  const total_number_of_words = paragraph.split(" ").length;

  const handleClick = () => {
    setFinalEvaluation((prev) => !prev);
    setDuration({
      minutes: 1,
      seconds: 0,
    });
    setIndex(Math.floor(Math.random()*data.length));
    const spanElements = document.querySelectorAll('.Paragraph-Wrapper span');
    const pElements = document.querySelectorAll('.Timer-Options p');
    spanElements.forEach((element)=>{
      element.classList.remove('Highlight-CorrectSpelled-Text','Highlight-IncorrectSpelled-Text');
    })
    pElements.forEach((element)=>{
      if(element.classList.contains('Active')){
         element.classList.remove('Active');
      }
    })
    pElements[0].classList.add('Active');
  };
  
  return (
    <div className="ResultModal">
      <div className="Result-Wrapper">
        <div className="Score-Card">
          <p className="Score-Indicator">{evaluation.correct-evaluation.errors}</p>
        </div>
        <div className="ResultModal-Input-Wrapper">
          <p>Total Words : {total_number_of_words}</p>
          <p>correctly Typed count :{evaluation.correct-evaluation.errors}</p>
          <p>Incorrectly Typed count :{evaluation.errors}</p>
        </div>
        <div className="TextSetModal-Set-Button-Wrapper">
          <button className="Set-Button Trigger-Button" onClick={handleClick}>
            Practice Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
