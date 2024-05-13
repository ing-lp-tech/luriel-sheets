import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import {
  getProducts,
  getEntradas,
  getSalidas,
  getInventario,
  writeDataToSheet,
} from "../auth";
import ExcelTable from "../components/Products/ExcelTable"; // Importa tu componente ExcelTable

const Products = () => {
  const [alignment, setAlignment] = useState(null);
  const [open, setOpen] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    nroRef: "",
    nroRef2: "",
  });
  const [products, setProducts] = useState([]);

  const handleChange = async (event, newAlignment) => {
    setAlignment(newAlignment);
    setShowAddButton(false);
    setOpen(false);
    if (newAlignment === "productos") {
      setShowAddButton(true);
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        console.log("products:", productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    if (newAlignment === "entradas") {
      setShowAddButton(true);
      try {
        const productsData = await getEntradas();
        setProducts(productsData);
        console.log("entradas:", productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    if (newAlignment === "salidas") {
      setShowAddButton(true);
      try {
        const productsData = await getSalidas();
        setProducts(productsData);
        console.log("salidas:", productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    if (newAlignment === "inventario") {
      setShowAddButton(true);
      try {
        const productsData = await getInventario();
        setProducts(productsData);
        console.log("inventario:", productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /* const handleSubmit = async () => {
    // Aquí puedes manejar la lógica para enviar los datos a tu backend o hacer lo que necesites con formData
    console.log(formData);

    // Llama a la función para escribir datos en Google Sheets
    try {
      await writeDataToSheet(alignment, formData);
      console.log("Datos enviados correctamente a Google Sheets");
    } catch (error) {
      console.error("Error al enviar datos a Google Sheets:", error);
    }

    handleClose();
  }; */
  const handleSubmit = async () => {
    // Aquí puedes manejar la lógica para enviar los datos a tu backend o hacer lo que necesites con formData
    console.log(formData);

    // Llama a la función para escribir datos en Google Sheets
    try {
      await writeDataToSheet(alignment, formData);
      console.log("Datos enviados correctamente a Google Sheets");

      // Actualiza los productos después de enviar los datos
      if (alignment === "productos") {
        const updatedProducts = await getProducts();
        setProducts(updatedProducts);
      } else if (alignment === "entradas") {
        const updatedProducts = await getEntradas();
        setProducts(updatedProducts);
      }
      // Agrega condiciones para otros tipos de alineación si es necesario

      handleClose();
    } catch (error) {
      console.error("Error al enviar datos a Google Sheets:", error);
    }
  };

  useEffect(() => {
    // Puedes realizar alguna acción cuando el componente se monte o actualice
    console.log("Alignment changed:", alignment);
  }, [alignment]);

  return (
    <Container style={{ textAlign: "center" }}>
      <Container>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="productos">Productos</ToggleButton>
          <ToggleButton value="entradas">Entradas</ToggleButton>
          <ToggleButton value="salidas">Salidas</ToggleButton>
          <ToggleButton value="inventario">Inventario</ToggleButton>
        </ToggleButtonGroup>
      </Container>
      {alignment !== null && (
        <Container className="tabla">
          {products.length > 0 && <ExcelTable data={products} />}
        </Container>
      )}
      {showAddButton && (
        <Button onClick={handleAddClick} variant="contained" color="primary">
          Agregar {alignment}
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Entrada</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, complete los siguientes campos:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            type="text"
            fullWidth
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Número de Referencia"
            type="text"
            fullWidth
            name="nroRef"
            value={formData.nroRef}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Número de Referencia 2"
            type="text"
            fullWidth
            name="nroRef2"
            value={formData.nroRef2}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Products;
