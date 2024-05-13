import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import "../../styles/contact/contact.css";
const ContactComponent = () => {
  //
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "@gmail.com",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("formData:", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("auth-token-app"),
        },
        body: JSON.stringify(formData),
      });
      console.log("create mail", response.status, response.mail);
      if (response.status == 200) {
        // Producto creado exitosamente
        console.log("Mail send successfully");
        setFormData({
          nombre: "",
          correo: "@gmail.com",
          mensaje: "",
        });
        // Agregar lógica adicional según sea necesario
      } else {
        // Error al crear el producto
        console.error("Error creating mail");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <div className="titleContac">
        <h2>Contactanos</h2>
      </div>
      <ContainerSection>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom style={{ fontSize: "14px" }}>
              Contáctanos
            </Typography>
            <Typography variant="body1">
              Si tienes alguna pregunta o comentario, no dudes en contactarnos.
              Estamos aquí para ayudarte.
            </Typography>
            <Typography variant="body1">
              Dirección: Bogota 3219, Local 10, Flores
            </Typography>
            <Typography variant="body1">Teléfono: +549 1157806456</Typography>
            <Typography variant="body1">
              Correo Electrónico: scargo@gmail.com
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <form className="form" onSubmit={handleSubmit}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ fontSize: "14px" }}
              >
                Envíanos un mensaje
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  {/* El primer TextField ocupará 4 columnas de las 12, es decir, 1/3 del ancho total */}
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={8}>
                  {/* El segundo TextField ocupará 8 columnas de las 12, es decir, 2/3 del ancho total */}
                  <TextField
                    label="Correo Electrónico"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <TextField
                label="Mensaje"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
              />

              <Box sx={{ width: 200, display: "flex", marginX: "auto" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Enviar Mensaje
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </ContainerSection>
    </div>
  );
};

export default ContactComponent;

const ContainerSection = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));
