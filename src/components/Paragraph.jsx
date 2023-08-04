import "./Paragraph.css";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/globalContext";

const Paragraph = () => {

  const { paragraph, setEvaluation} = useContext(GlobalContext);

  const words = paragraph.split(" ");

  useEffect(() => {
    setEvaluation((prev) => {
      return {
        ...prev,
        correct: words.length,
        errors:0
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paragraph]);

  return (
    <section className="Paragraph">
      <p className="Paragraph-Wrapper">
        {words.map((word, index) => (
          <span key={index} style={{ padding: "0.3rem" }}>
            {word}
          </span>
        ))}
      </p>
    </section>
  );
};

export default Paragraph;
