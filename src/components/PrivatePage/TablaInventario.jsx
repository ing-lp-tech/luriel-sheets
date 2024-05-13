/* eslint-disable react/prop-types */
// En TablaInventario.js

// eslint-disable-next-line react/prop-types
import { useState } from "react";

const TablaInventario = ({ cortes, onEliminar, onModificar }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEliminar = (id) => {
    onEliminar(id);
    setSelectedRow(null);
  };

  const handleModificar = (id) => {
    onModificar(id);
    setSelectedRow(null);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Cantidad Metros</th>
          <th>Cantidad Prendas</th>
          <th>Colores</th>
          <th>Talles</th>
          <th>Fecha</th>
          <th>Observaciones</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {cortes.map((item) => (
          <tr key={item.id}>
            <td>
              {selectedRow === item.id ? (
                <input type="text" value={item.id} />
              ) : (
                item.id
              )}
            </td>
            <td>
              {selectedRow === item.id ? (
                <input type="text" value={item.nombre} />
              ) : (
                item.nombre
              )}
            </td>
            <td>
              {selectedRow === item.id ? (
                <input type="text" value={item.cant_metros} />
              ) : (
                item.cant_metros
              )}
            </td>
            <td>
              {selectedRow === item.id ? (
                <input type="text" value={item.cant_prendas} />
              ) : (
                item.cant_prendas
              )}
            </td>
            <td>
              {selectedRow === item.id ? (
                <input type="text" value={item.colores} />
              ) : (
                item.colores
              )}
            </td>
            <td>
              {selectedRow === item.id ? (
                <input type="text" value={item.talles} />
              ) : (
                item.talles
              )}
            </td>
            <td>
              {selectedRow === item.id ? (
                <input type="text" value={item.fecha} />
              ) : (
                item.fecha
              )}
            </td>
            <td>
              {selectedRow === item.id ? (
                <input type="text" value={item.observaciones} />
              ) : (
                item.observaciones
              )}
            </td>
            <td>
              {selectedRow === item.id ? (
                <>
                  <button onClick={() => handleEliminar(item.id)}>
                    Eliminar
                  </button>
                  <button onClick={() => handleModificar(item.id)}>
                    Modificar
                  </button>
                </>
              ) : (
                <select onChange={() => setSelectedRow(item.id)}>
                  <option value="">Acciones</option>
                  <option value="eliminar">Eliminar</option>
                  <option value="modificar">Modificar</option>
                </select>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaInventario;

/* const TablaInventario = ({ inventario }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Fecha</th>
          <th>Cant. Metros</th>
          <th>Cant. Prendas</th>
          <th>Cant. Talles</th>
          <th>Cant. Colores</th>
          <th>stock</th>
        </tr>
      </thead>
      <tbody>
        {inventario.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.fecha}</td>
            <td>{item.cantMetros}</td>
            <td>{item.cantPrendas}</td>
            <td>{item.cantTalles}</td>
            <td>{item.cantColores}</td>
            <td>
              {" "}
              {Object.entries(item.inventario).map(([clave, valores]) => (
                <div key={clave}>
                  <p>Talle: {clave}</p>
                  {Object.entries(valores).map(([propiedad, valor]) => (
                    <p key={propiedad}>
                      {propiedad}: {valor}
                    </p>
                  ))}
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaInventario; */
