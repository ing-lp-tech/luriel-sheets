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

const Products = () => {
  const [alignment, setAlignment] = useState(null);
  const [open, setOpen] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const [formData, setFormData] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
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

    fetchData();
  }, [alignment]);

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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /* const handleSubmit = async () => {
    try {
      await writeDataToSheet(alignment, formData);
      console.log("Datos enviados correctamente a Google Sheets");

      if (alignment === "productos") {
        setProducts(await getProducts());
      }

      handleClose();
    } catch (error) {
      console.error("Error al enviar datos a Google Sheets:", error);
    }
  }; */
  const handleSubmit = async () => {
    try {
      // Filtrar las propiedades de formData para excluir la primera
      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key, value], index) => index !== 0)
      );

      await writeDataToSheet(alignment, filteredData);
      console.log("Datos enviados correctamente a Google Sheets");

      if (alignment === "productos") {
        setProducts(await getProducts());
      }

      handleClose();
    } catch (error) {
      console.error("Error al enviar datos a Google Sheets:", error);
    }
  };

  console.log("alignment", alignment);

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
          {products.length > 0 &&
            Object.entries(products[0]).map(([key, label]) =>
              key === "id" ? null : ( // Ignora el primer valor del objeto
                <TextField
                  key={key}
                  autoFocus
                  margin="dense"
                  label={label}
                  type="text"
                  fullWidth
                  name={key}
                  /* value={formData[key] || ""} */
                  /* value={""} */
                  onChange={handleInputChange}
                  mb={2}
                />
              )
            )}
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

const ResponsiveContainer = styled(Container)(({ alignment }) => ({
  width: "100%",
  padding: "20px",
  // Nuevo código: altura dinámica basada en la alineación
  height: alignment === null ? "16rem" : "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "@media (min-width: 768px)": {
    maxWidth: "960px",
    margin: "0 auto",
    height: alignment === null ? "100px" : "auto", // Nuevo código
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
