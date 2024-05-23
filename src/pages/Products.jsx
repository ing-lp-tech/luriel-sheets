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
  Typography,
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

const Products = () => {
  const [alignment, setAlignment] = useState(null);
  const [open, setOpen] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const [formData, setFormData] = useState({});
  const [products, setProducts] = useState([]);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAlignmentChange = async (event, newAlignment) => {
    setAlignment(newAlignment);
    setShowAddButton(true);
    setOpen(false);
  };

  const handleAddClick = () => {
    setOpen(true);
    if (products.length > 0) {
      setFormData(products[0]);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage(""); // Clear the error message when closing the dialog
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("name, value:", name, value);

    if (alignment === "productos" && name === "nro_de_ref") {
      const isDuplicate = products.some(
        (product) => product.nro_de_ref === value
      );
      setIsAddButtonDisabled(isDuplicate);
      if (isDuplicate) {
        setErrorMessage("El producto con este número de referencia ya existe.");
      } else {
        setErrorMessage("");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key, value], index) => index !== 0)
      );

      // Convert fields to appropriate types
      const transformedData = { ...filteredData };
      if ("id" in transformedData) {
        transformedData.id = Number(transformedData.id);
      }
      if ("cantidad" in transformedData) {
        transformedData.cantidad = Number(transformedData.cantidad);
      }
      for (const key in transformedData) {
        if (key.toLowerCase().includes("fecha")) {
          transformedData[key] = new Date(transformedData[key]);
        }
      }

      await writeDataToSheet(alignment, transformedData);
      console.log("Datos enviados correctamente a Google Sheets");

      if (alignment === "productos") {
        setProducts(await getProducts());
      }

      handleClose();
    } catch (error) {
      console.error("Error al enviar datos a Google Sheets:", error);
    }
  };

  const fetchData = async () => {
    try {
      let data;
      if (alignment === "productos") {
        data = await getProducts();
      } else if (alignment === "entradas") {
        data = await getEntradas();
      } else if (alignment === "salidas") {
        data = await getSalidas();
      } else if (alignment === "inventario") {
        data = await getInventario();
      }
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [alignment]);

  return (
    <ResponsiveContainer alignment={alignment}>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleAlignmentChange}
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
          {products.length > 0 && (
            <ExcelTable
              data={products}
              hoja={alignment}
              fetchData={fetchData}
            />
          )}
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
          {products.length > 0 &&
            Object.entries(products[0]).map(([key, label]) => {
              if (key === "id") return null;
              if (key.toLowerCase().includes("fecha")) {
                return (
                  <TextField
                    key={key}
                    autoFocus
                    margin="dense"
                    label={label}
                    type="date"
                    fullWidth
                    name={key}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    mb={2}
                  />
                );
              } else {
                return (
                  <TextField
                    key={key}
                    autoFocus
                    margin="dense"
                    label={label}
                    type="text"
                    fullWidth
                    name={key}
                    onChange={handleInputChange}
                    mb={2}
                  />
                );
              }
            })}
          {errorMessage && (
            <Typography color="error" variant="body2" mt={2}>
              {errorMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} mr={2}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={isAddButtonDisabled}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </ResponsiveContainer>
  );
};

export default Products;

const ResponsiveContainer = styled(Container)(({ alignment }) => ({
  width: "100%",
  padding: "20px",
  height: alignment === null ? "16rem" : "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "@media (min-width: 768px)": {
    maxWidth: "960px",
    margin: "0 auto",
    height: alignment === null ? "100px" : "auto",
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
}));
