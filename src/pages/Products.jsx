import React, { useState, useEffect } from "react";
import {
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  getProducts,
  getEntradas,
  getSalidas,
  getInventario,
  writeDataToSheet,
} from "../auth";
import ExcelTable from "../components/Products/ExcelTable";

const ResponsiveContainer = styled(Container)({
  width: "100%",
  padding: "20px",
  height: "82vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "@media (min-width: 768px)": {
    maxWidth: "960px",
    margin: "0 auto",
    height: "82vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  "@media (min-width: 992px)": {
    maxWidth: "1170px",
    margin: "0 auto",
  },
  "@media (min-width: 1200px)": {
    maxWidth: "1400px",
    margin: "0 auto",
  },
});

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

  const handleSubmit = async () => {
    console.log(formData);

    try {
      await writeDataToSheet(alignment, formData);
      console.log("Datos enviados correctamente a Google Sheets");

      if (alignment === "productos") {
        const updatedProducts = await getProducts();
        setProducts(updatedProducts);
      } else if (alignment === "entradas") {
        const updatedProducts = await getEntradas();
        setProducts(updatedProducts);
      }

      handleClose();
    } catch (error) {
      console.error("Error al enviar datos a Google Sheets:", error);
    }
  };

  useEffect(() => {
    console.log("Alignment changed:", alignment);
  }, [alignment]);

  return (
    <ResponsiveContainer>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        mb={4}
      >
        <ToggleButton value="productos">Productos</ToggleButton>
        <ToggleButton value="entradas">Entradas</ToggleButton>
        <ToggleButton value="salidas">Salidas</ToggleButton>
        <ToggleButton value="inventario">Inventario</ToggleButton>
      </ToggleButtonGroup>

      {alignment && (
        <Container className="tabla" mb={4}>
          {products.length > 0 && <ExcelTable data={products} />}
        </Container>
      )}

      {showAddButton && (
        <Button onClick={handleAddClick} color="primary" mb={4}>
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
            mb={2}
          />
          <TextField
            margin="dense"
            label="Número de Referencia"
            type="text"
            fullWidth
            name="nroRef"
            value={formData.nroRef}
            onChange={handleInputChange}
            mb={2}
          />
          <TextField
            margin="dense"
            label="Número de Referencia 2"
            type="text"
            fullWidth
            name="nroRef2"
            value={formData.nroRef2}
            onChange={handleInputChange}
            mb={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} mr={2}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </ResponsiveContainer>
  );
};

export default Products;
