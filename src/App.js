import Timer from "./components/Timer";
import Paragraph from "./components/Paragraph";
import TypingBox from "./components/TypingBox";
import { GlobalContext} from "./context/globalContext";
import "./App.css";
import Result from "./components/Result";
import {useContext } from "react";



function App() {
   const {finalEvaluation} = useContext(GlobalContext);
  return ( 
    
   <>
    {finalEvaluation && <Result/>}
    <div className="App">
      <h1 className="Project-Title">Typing Speed Test</h1>
      
      <section className="Container">
      <Timer/>
      <Paragraph/>
      <TypingBox/>
      </section>
      
    </div>
    </>
    
  );
}

export default App;
