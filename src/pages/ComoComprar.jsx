import StepperComponent from "../components/ComoComprar/StepperComponent ";
import "../styles/comoComprar/comoComprar.css";

const ComoComprar = () => {
  return (
    <div className="ComoComprar">
      <h1>¡Bienvenido a tu Tienda en Línea!</h1>
      <img src="/imagenes/como-comprar.png" alt="" />
      <StepperComponent />
    </div>
  );
};

export default ComoComprar;
