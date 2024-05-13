import "../../styles/footer/footer.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h2>Galeria Camino de la ciudad, Local 10</h2>
            <p>Dirección: Bogotá 3219, Flores</p>
            <Link to={"https://maps.app.goo.gl/J1FWDbGwSqTT5VbcA"}>
              <LocationOnIcon sx={{ color: "#09f" }} />
            </Link>
          </div>
          <div className="footer-section">
            <h2>Contacto</h2>
            <p>Teléfono: (+549) 1162020911</p>
            <p>Correo Electrónico: scargo@gmail.com</p>
          </div>
          <div className="footer-section">
            <h2>Redes Sociales</h2>
            <ul className="social-icons">
              <li>
                <Link to={"https://maps.app.goo.gl/J1FWDbGwSqTT5VbcA"}>
                  <InstagramIcon />
                </Link>
              </li>
              <li>
                <Link
                  to={
                    "https://www.facebook.com/p/Scargo-Jeans-100063442737076/"
                  }
                >
                  <FacebookIcon />
                </Link>
              </li>
              <li>
                <Link to={"https://maps.app.goo.gl/J1FWDbGwSqTT5VbcA"}>
                  <InstagramIcon />
                </Link>
              </li>
            </ul>
          </div>
          {/* <div className="footer-section">
            <h2>Categorías de Productos</h2>
            <ul>
              <li>
                <a href="#">Niños</a>
              </li>
              <li>
                <a href="#">Niñas</a>
              </li>
              <li>
                <a href="#">Bebés</a>
              </li>
            </ul>
          </div> */}
          <div className="footer-section">
            <h2>Preguntas Frecuentes</h2>
            <ul>
              <li>
                <Link to={"/faq"}>¿Cómo realizar un pedido?</Link>
              </li>
              <li>
                <Link to={"/faq"}>Política de devoluciones</Link>
              </li>
              <li>
                <Link to={"/faq"}>Términos y condiciones</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
