import FaqComponent from "../components/faq/FaqComponent";
import "../styles/faq/faq.css";
const Faq = () => {
  return (
    <div className="faqPage">
      <h1>¡Preguntas mas frecuentes!</h1>
      <FaqComponent />
    </div>
  );
};

export default Faq;
