import "./Paragraph.css";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/globalContext";

const Paragraph = () => {

  const { paragraph, setEvaluation} = useContext(GlobalContext);

  const words = paragraph.split("");

  useEffect(()=>{
     const original_string_word_count = paragraph.split(' ').length;
    setEvaluation((prev) => {
      return {
        ...prev,
        correct: original_string_word_count,
      };
    });

  },[paragraph])


  return (
    <section className="Paragraph">
      <p className="Paragraph-Wrapper">
        {words.map((word, index) => (
          <span key={index}>
            {word}
          </span>
        ))}
      </p>
    </section>
  );
};

export default Paragraph;
