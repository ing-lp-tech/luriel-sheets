// En ConfiguracionStock.js

import { useState } from "react";

// eslint-disable-next-line react/prop-types
const ConfiguracionStock = ({ onConfiguracionChange }) => {
  const [configuracion, setConfiguracion] = useState({
    talles: [],
    colores: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validar el tipo de entrada según el nombre del campo
    const validatedValue =
      name === "talles" ? validateNumeric(value) : validateString(value);

    if (validatedValue !== null) {
      setConfiguracion((prevConfig) => ({
        ...prevConfig,
        [name]: validatedValue.split(",").map((item) => item.trim()),
      }));
    }
  };

  const validateNumeric = (input) => {
    // Validar que el input solo contenga números y comas
    return /^[0-9, ]*$/.test(input) ? input : null;
  };

  const validateString = (input) => {
    // Validar que el input solo contenga letras, espacios y comas
    return /^[a-zA-Z, ]*$/.test(input) ? input : null;
  };

  const handleConfiguracionSubmit = (e) => {
    e.preventDefault();
    onConfiguracionChange(configuracion);
  };

  return (
    <div>
      <h2>Configuración de Stock</h2>
      <form onSubmit={handleConfiguracionSubmit}>
        <label>
          Talles (separados por coma):
          <input
            type="text"
            name="talles"
            value={configuracion.talles.join(",")}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Colores (separados por coma):
          <input
            type="text"
            name="colores"
            value={configuracion.colores.join(",")}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Guardar configuración</button>
      </form>
    </div>
  );
};

export default ConfiguracionStock;
