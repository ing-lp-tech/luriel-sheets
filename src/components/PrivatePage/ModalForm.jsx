/* eslint-disable react/prop-types */
import { useState } from "react";
import ConfiguracionStock from "./Configuration";
import SeleccionStock from "./SelectionStock";
import "../../styles/privatePage/modalForm.css";

const ModalForm = ({ open, onClose, onSave }) => {
  const [formState, setFormState] = useState({
    fecha: "",
    cantMetros: "",
    cantPrendas: "",
    cantTalles: "",
    cantColores: "",
    configuracion: {
      talles: ["S", "M", "L"],
      colores: ["Rojo", "Azul"],
    },
    inventario: {},
  });

  const handleGuardar = () => {
    onSave(formState);
    resetForm();
  };

  const resetForm = () => {
    setFormState({
      ...formState,
      fecha: "",
      cantMetros: 0,
      cantPrendas: 0,
    });
  };

  const handleConfiguracionChange = (nuevaConfiguracion) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      configuracion: nuevaConfiguracion,
      inventario: {},
    }));
  };

  const handleCantidadChange = (talla, color, cantidad) => {
    setFormState((prevFormState) => {
      const nuevoInventario = { ...prevFormState.inventario };

      if (!nuevoInventario[talla]) {
        nuevoInventario[talla] = {};
      }

      nuevoInventario[talla][color] = cantidad;

      return {
        ...prevFormState,
        inventario: nuevoInventario,
      };
    });
  };

  return (
    <div className={`modal-container ${open ? "modal-open" : ""}`}>
      <h2>Nuevo Registro</h2>
      <label>Fecha:</label>
      <input
        type="date"
        value={formState.fecha}
        onChange={(e) => setFormState({ ...formState, fecha: e.target.value })}
      />
      <label>Cantidad de Metros:</label>
      <input
        type="number"
        value={formState.cantMetros}
        onChange={(e) =>
          setFormState({ ...formState, cantMetros: e.target.value })
        }
      />
      <label>Cantidad de Prendas:</label>
      <input
        type="number"
        value={formState.cantPrendas}
        onChange={(e) =>
          setFormState({ ...formState, cantPrendas: e.target.value })
        }
      />

      <ConfiguracionStock onConfiguracionChange={handleConfiguracionChange} />
      <SeleccionStock
        talles={formState.configuracion.talles}
        colores={formState.configuracion.colores}
        onCantidadChange={handleCantidadChange}
      />
      {/*  <pre>{JSON.stringify({ inventario: formState.inventario }, null, 2)}</pre>
      <label>Cantidad de Talles:</label>
      <input
        type="number"
        value={formState.cantTalles}
        onChange={(e) =>
          setFormState({ ...formState, cantTalles: e.target.value })
        }
      />
      <label>Cantidad de Colores:</label>
      <input
        type="number"
        value={formState.cantColores}
        onChange={(e) =>
          setFormState({ ...formState, cantColores: e.target.value })
        }
      /> */}
      <button onClick={handleGuardar}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default ModalForm;

/* import { useState } from "react";
import ConfiguracionStock from "./Configuration";
import SeleccionStock from "./SelectionStock";

// eslint-disable-next-line react/prop-types
const ModalForm = ({ open, onClose, onSave }) => {
  const [fecha, setFecha] = useState("");
  const [cantMetros, setCantMetros] = useState(0);
  const [cantPrendas, setCantPrendas] = useState(0);
  const [cantTalles, setCantTalles] = useState(0);
  const [cantColores, setCantColores] = useState(0);

  //
  const [configuracion, setConfiguracion] = useState({
    talles: ["S", "M", "L"],
    colores: ["Rojo", "Azul", "Verde"],
  });

  const [inventario, setInventario] = useState({});
  //
  const handleGuardar = () => {
    onSave({
      fecha,
      cantMetros,
      cantPrendas,
      cantTalles,
      cantColores,
      inventario,
    });
    resetForm();
  };

  const resetForm = () => {
    setFecha("");
    setCantMetros(0);
    setCantPrendas(0);
    setCantTalles(0);
    setCantColores(0);
  };

  //
  const handleConfiguracionChange = (nuevaConfiguracion) => {
    setConfiguracion(nuevaConfiguracion);
    // Reiniciar el inventario al cambiar la configuración
    setInventario({});
  };

  const handleCantidadChange = (talla, color, cantidad) => {
    setInventario((prevInventario) => {
      const nuevoInventario = { ...prevInventario };

      if (!nuevoInventario[talla]) {
        nuevoInventario[talla] = {};
      }

      nuevoInventario[talla][color] = cantidad;
      return nuevoInventario;
    });
  };

  //
  console.log("inventario:", inventario);
  return (
    <div className={`modal-container ${open ? "modal-open" : ""}`}>
      <h2>Nuevo Registro</h2>
      <label>Fecha:</label>
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <label>Cantidad de Metros:</label>
      <input
        type="number"
        value={cantMetros}
        onChange={(e) => setCantMetros(e.target.value)}
      />
      <label>Cantidad de Prendas:</label>
      <input
        type="number"
        value={cantPrendas}
        onChange={(e) => setCantPrendas(e.target.value)}
      />

      <ConfiguracionStock onConfiguracionChange={handleConfiguracionChange} />
      <SeleccionStock
        talles={configuracion.talles}
        colores={configuracion.colores}
        onCantidadChange={handleCantidadChange}
      />
      <pre>{JSON.stringify({ inventario }, null, 2)}</pre>
      <label>Cantidad de Talles:</label>
      <input
        type="number"
        value={cantTalles}
        onChange={(e) => setCantTalles(e.target.value)}
      />
      <label>Cantidad de Colores:</label>
      <input
        type="number"
        value={cantColores}
        onChange={(e) => setCantColores(e.target.value)}
      />
      <button onClick={handleGuardar}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default ModalForm;
 */
