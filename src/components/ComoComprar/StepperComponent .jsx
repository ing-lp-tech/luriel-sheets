import { useState } from "react";
import "../../styles/comoComprar/StepperComponent.css"; // Importa los estilos CSS del Stepper

import { Stepper, Step, StepLabel, Button } from "@mui/material";

const steps = [
  "Elegí los productos que desees y agrégalos al carrito de compras. ",
  "Comunicate por wattsap para concluir la compra y ultimar detalles",
  `Coordina el Pago y la forma de envio.`,
];

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  console.log("activeStep", activeStep);
  return (
    <div className="stepper">
      <div className="ecommerce-segment">
        <div className="stepper-container">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    color: "red",

                    "& .MuiSlider-thumb": {
                      display: "none",
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className="stepper-content">
            <div>
              <p>{steps[activeStep]}</p>
              <div className="stepper-button-container">
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Atrás
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={activeStep === 2}
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Fin" : "Siguiente"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {activeStep === steps.length - 1 && (
        <div className="compraCompleta">
          <h2>Asi de simple ralizas tu compra !!!</h2>
        </div>
      )}
    </div>
  );
};

export default StepperComponent;
