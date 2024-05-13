import "../styles/error.css";
import { Typography, Button, Zoom } from "@mui/material";
const Error404 = () => {
  return (
    <div className="error-container">
      <Zoom in={true} timeout={500}>
        <div className="error-content">
          <Typography variant="h1" color="secondary">
            404
          </Typography>
          <Typography variant="h5">¡Ups! Parece que te has perdido.</Typography>
          <Typography variant="body1">
            La página que buscas no existe.
          </Typography>
          <Button variant="contained" color="primary" href="/">
            Volver a la página de inicio
          </Button>
        </div>
      </Zoom>
    </div>
  );
};

export default Error404;
