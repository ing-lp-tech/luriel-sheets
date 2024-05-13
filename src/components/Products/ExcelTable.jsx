import React, { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const ExcelTable = ({ data }) => {
  const tableContainerStyle = {
    maxWidth: "100%",
    overflowX: "auto",
  };

  const tableStyle = {
    minWidth: 650,
  };

  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    // Define los campos del formulario según tu estructura de datos
    nombre: "",
    nroRef: "",
    nroSer: "",
  });
  const [openForm, setOpenForm] = useState(false);

  // Obtén las claves (nombres de las columnas) del primer objeto
  const columnHeaders = Object.keys(data[0]);

  // Función para manejar la edición de una fila
  const handleEditRow = (rowIndex) => {
    console.log(`Editando fila ${rowIndex + 1}`);
    setSelectedRow(rowIndex);
    setFormData(data[rowIndex + 1]); // Carga los datos de la fila seleccionada en el formulario
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleSubmitForm = () => {
    // Lógica para enviar los datos actualizados a Google Sheets
    console.log("Datos actualizados:", formData);

    // Código para actualizar los datos en Google Sheets
    // writeDataToSheet(alignment, formData);

    setOpenForm(false);
  };
  // Función para manejar la eliminación de una fila
  const handleDeleteRow = (rowIndex) => {
    console.log(`Borrando fila ${rowIndex}`);
    // Agrega aquí la lógica para borrar la fila
  };

  return (
    <div>
      <TableContainer component={Paper} style={tableContainerStyle}>
        <Table style={tableStyle} aria-label="Excel Table">
          {/* Encabezados de la tabla */}
          <TableHead>
            {/* Filas de la tabla */}
            <TableRow>
              {columnHeaders.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          {/* Cuerpo de la tabla */}
          <TableBody>
            {data.slice(1).map((row, index) => (
              <TableRow key={index}>
                {columnHeaders.map((header) => (
                  <TableCell key={header}>{row[header]}</TableCell>
                ))}
                <TableCell>
                  {/* Botón de edición */}
                  <IconButton
                    onClick={() => handleEditRow(index)}
                    aria-label="Editar"
                  >
                    <EditIcon />
                  </IconButton>
                  {/* Icono de borrado */}
                  <IconButton
                    onClick={() => handleDeleteRow(index)}
                    aria-label="Borrar"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Formulario emergente */}
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>Editar Información</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, modifique los siguientes campos:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="NroRef"
            type="text"
            fullWidth
            name="NroRef"
            value={formData.nro_de_ref}
            onChange={(e) =>
              setFormData({ ...formData, nroRef: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            type="text"
            fullWidth
            name="nombre"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
          />

          <TextField
            autoFocus
            margin="dense"
            label="NroSer"
            type="text"
            fullWidth
            name="NroSer"
            value={formData.nro_de_serie}
            onChange={(e) =>
              setFormData({ ...formData, nroSer: e.target.value })
            }
          />
          {/* Otros campos del formulario */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancelar</Button>
          <Button onClick={handleSubmitForm} color="primary">
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ExcelTable;
