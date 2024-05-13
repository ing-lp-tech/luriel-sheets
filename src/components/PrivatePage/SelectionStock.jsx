import "../../styles/privatePage/selectionStock.css";

/* eslint-disable react/prop-types */

const SeleccionStock = ({ talles, colores, onCantidadChange }) => {
  return (
    <div>
      <h2>Selección de Stock</h2>
      <table>
        <thead>
          <tr>
            <th>Talla</th>
            {colores.map((color) => (
              <th key={color}>{color}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {talles.map((talla) => (
            <tr key={talla}>
              <td>{talla}</td>
              {colores.map((color) => (
                <td key={color}>
                  <input
                    type="number"
                    min="0"
                    onChange={(e) =>
                      onCantidadChange(
                        talla,
                        color,
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeleccionStock;
