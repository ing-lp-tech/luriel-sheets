import { useState, useEffect } from "react";
import "../../styles/home/carousel.css";
import { productsScargo } from "../../productsScargo";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

/* const images = [
  {
    label: "Imagen 1",
    imgPath: "url_imagen_1.jpg",
  },
  {
    label: "Imagen 2",
    imgPath: "url_imagen_2.jpg",
  },
  {
    label: "Imagen 3",
    imgPath: "url_imagen_3.jpg",
  },
]; */

const Carousel = () => {
  const [activeStep, setActiveStep] = useState(0);

  const images = productsScargo.map((product) => ({
    label: product.title,
    imgPath: product.images[0],
  }));

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % images.length);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? images.length - 1 : prevActiveStep - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); // Cambiar automáticamente cada 5 segundos

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <div className="carousel-container">
        <button onClick={handleBack} className="carousel-button prev">
          <SkipPreviousIcon />
        </button>
        <div className="carousel">
          <img
            src={images[activeStep].imgPath}
            alt={images[activeStep].label}
            className="carousel-image"
          />
          {/* <button onClick={handleBack} className="carousel-button prev">
            Anterior
          </button>
          <button onClick={handleNext} className="carousel-button next">
            Siguiente
          </button> */}
        </div>
        <button onClick={handleNext} className="carousel-button next">
          <SkipNextIcon />
        </button>
      </div>
    </>
  );
};

export default Carousel;
