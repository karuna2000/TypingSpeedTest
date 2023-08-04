import React,{useContext, useRef} from 'react';
import { GlobalContext } from '../context/globalContext';


const TextSetModal = ({setShow}) => {

    const{setParagraph} = useContext(GlobalContext);
    const textAreaRef = useRef();

    const handleClick = ()=>{
        setShow((prev)=>!prev);
    }

    const handleSetText = ()=>{
      setParagraph(textAreaRef.current.value);
      textAreaRef.current.value = '';
      setShow((prev)=>!prev);

    }

  
  return (
    <div className="TextSetModal">
      <div className="TextSetModal-Wrapper">
        <div className="TextSetModal-Input-Wrapper">
        <textarea placeholder='paste your text here....' 
        className='TextArea TextArea-Text' rows = {5} 
        ref={textAreaRef}  
        />
        </div>
        <div className="TextSetModal-Set-Button-Wrapper">
          <button className="Set-Button Trigger-Button" onClick={handleSetText}>Set Text</button>
          <button className="Close-Set-Button" onClick={handleClick}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default TextSetModal;