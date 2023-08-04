import { useState,useEffect } from "react";
import { GlobalContext } from "./globalContext";
import data from '../data.json';

const TimerContext = ({children})=>{
    const[index,setIndex] = useState(Math.floor(Math.random()*data.length));
    const[duration,setDuration] = useState({
      minutes:1,
      seconds:0
    });

    const[paragraph,setParagraph] = useState(data[index]);
    const[evaluation,setEvaluation] = useState({
      errors:0,
      correct:0
    });
    const[finalEvaluation,setFinalEvaluation] = useState(false);

    useEffect(()=>{
             setParagraph(data[index]);
    },[index])
    
    return(
        <GlobalContext.Provider value={{duration,setDuration,paragraph,setParagraph,evaluation,setEvaluation,finalEvaluation,setFinalEvaluation,setIndex}}>
            {children}
        </GlobalContext.Provider>
    )
}


export default TimerContext;