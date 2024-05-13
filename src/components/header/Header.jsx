/* import shield from "../assets/shield.svg";
import { useGlobalContext } from "../context/GlobalContextProvider"; */
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";
/* import PersonIcon from "@mui/icons-material/Person"; */
import MenuIcon from "@mui/icons-material/Menu";

import "../../styles/header/header.css";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { useEffect, useState } from "react";
import { productsScargo } from "../../productsScargo";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import CartBuy from "../Home/CartBuy.jsx";

import { Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";

const Header = () => {
  /* const { nombre } = useGlobalContext(); */
  const [searchString, setSearchString] = useState("");
  const [listaProductos, setListaProductos] = useState(productsScargo);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { productsSearch, isLoggedIn, logout } = useGlobalContext();

  //login
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleFilterProducto = (evento) => {
    setSearchString(evento.target.value);
  };

  //
  const navigate = useNavigate();

  useEffect(() => {
    setListaProductos(
      productsScargo.filter((producto) =>
        producto.title.toLowerCase().includes(searchString.toLowerCase())
      )
    );
    productsSearch(listaProductos);
  }, [searchString]);

  /* console.log("isLoggedIn: ", isLoggedIn); */
  return (
    <>
      <header>
        <div className="containerHeader">
          <div className="header-content">
            <div className="logo">
              <Link to={"/home"}>
                <h1>
                  Scargo
                  <ChildCareIcon />
                </h1>
              </Link>
            </div>
            {isLoggedIn ? (
              ""
            ) : (
              <div>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={searchString}
                    onChange={handleFilterProducto}
                  />
                </Search>
              </div>
            )}

            <div className="menu-toggle" onClick={toggleMobileMenu}>
              <MenuIcon fontSize="large" />
            </div>
            <div>
              <nav className={`nav ${isMobileMenuOpen ? "open" : ""}`}>
                <ul>
                  {isLoggedIn ? (
                    <>
                      <li>
                        {" "}
                        <Link
                          to={"/products"}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Productos
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link
                          to={"/usuarios_registrados"}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Gastos
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/usuarios_registrados"}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Deudas
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/usuarios_registrados"}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Precios
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/usuarios_registrados"}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          Pedidos y reservas
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to={"/comoComprar"}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          COMO COMPRAR
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/faq"}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          FAQ
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/contact"}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          CONTACTO
                        </Link>
                      </li>
                    </>
                  )}

                  <li>
                    <Button
                      id="fade-button"
                      aria-controls={open ? "fade-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <AccountCircleIcon />
                    </Button>
                    <Menu
                      /* id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade} */
                      id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                    >
                      {!isLoggedIn ? (
                        <Link
                          to="/login"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <MenuItem
                            onClick={() => {
                              handleClose();
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            Iniciar sesión
                          </MenuItem>
                        </Link>
                      ) : (
                        <MenuItem
                          onClick={() => {
                            logout(), handleClose, navigate("/home");
                          }}
                          /* const handleLogin = () => {
                            login(credentials);
                            navigate("/usuarios_registrados");
                          }; */
                        >
                          Cerrar sesion
                        </MenuItem>
                      )}
                    </Menu>
                  </li>
                </ul>
              </nav>
            </div>
            <CartBuy />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(0),
  marginLeft: 0,
  width: "30vw",
  /*  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "50vw",
  }, */
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "35vw",
  },
  [theme.breakpoints.up("md")]: {
    width: "auto",
    height: "20px",
  },
}));

const SearchIconWrapper = styled("div")(() => ({
  padding: "0px 10px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    /* padding: theme.spacing(1, 1, 1, 0), */
    padding: theme.spacing("auto"),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    /*  [theme.breakpoints.up("sm")]: {
     
    }, */
    [theme.breakpoints.up("md")]: {
      width: "25ch",
    },
  },
}));
