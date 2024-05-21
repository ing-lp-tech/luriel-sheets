import React, { useState, useEffect } from "react";
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
import { updateRowInSheet } from "../../auth"; // Import the function

const ExcelTable = ({ data, hoja, fetchData }) => {
  console.log(" data, hoja:", data, hoja);
  const tableContainerStyle = {
    maxWidth: "100%",
    overflowX: "auto",
  };

  const tableStyle = {
    minWidth: 650,
  };

  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [openForm, setOpenForm] = useState(false);

  // Obtén las claves (nombres de las columnas) del primer objeto
  const columnHeaders = Object.keys(data[0]);

  // Función para manejar la edición de una fila
  const handleEditRow = (rowIndex) => {
    console.log(`Editando fila ${rowIndex + 1}`);

    setSelectedRow(rowIndex);
    setFormData(data[rowIndex + 1]); // Carga los datos de la fila seleccionada en el formulario
    setOpenForm(true);
    console.log("formData:", formData);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitForm = async () => {
    console.log("Datos actualizados:", formData);

    // Código para actualizar los datos en Google Sheets
    await updateRowInSheet(hoja, selectedRow, formData); // Llama a la función para actualizar la fila en Google Sheets

    setOpenForm(false);
    fetchData();
  };

  const handleDeleteRow = (rowIndex) => {
    console.log(`Borrando fila ${rowIndex}`);
    // Agrega aquí la lógica para borrar la fila
  };

  /*  useEffect(() => fetchData(), [formData]); */

  return (
    <div>
      <TableContainer component={Paper} style={tableContainerStyle}>
        <Table style={tableStyle} aria-label="Excel Table">
          {/* Encabezados de la tabla */}
          <TableHead>
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
                  <IconButton
                    onClick={() => handleEditRow(index)}
                    aria-label="Editar"
                  >
                    <EditIcon />
                  </IconButton>
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
          {Object.keys(formData).map((key) => (
            <TextField
              key={key}
              autoFocus
              margin="dense"
              label={key}
              type="text"
              fullWidth
              name={key}
              value={formData[key]}
              onChange={handleInputChange}
            />
          ))}
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
