import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useGlobalContext } from "../context/GlobalContextProvider";
import { useNavigate } from "react-router-dom";
import "../styles/login/login.css";

import IconButton from "@mui/material/IconButton";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const { login } = useGlobalContext();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = () => {
    login(credentials);
    navigate("/products");
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="loginPage" style={{ textAlign: "left" }}>
      <h2>Iniciar sesión</h2>
      <div className="inputs">
        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <TextField
            label="Nombre"
            variant="outlined"
            id="outlined-size-small"
            size="small"
            fullWidth
            required
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" size="small">
            Contraseña*
          </InputLabel>{" "}
          {/* Cambiado de "Password" a "Contraseña" */}
          <OutlinedInput
            label="Contraseña" // Cambiado de "Password" a "Contraseña"
            size="small"
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={credentials.password} // Añadido para sincronizar el valor con el estado
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <Button variant="contained" color="primary" onClick={handleLogin}>
        Iniciar sesión
      </Button>
    </div>
  );
};

export default Login;
