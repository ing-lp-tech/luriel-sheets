/* import reactLogo from "./assets/react.svg"; */
/* import viteLogo from "/vite.svg"; */

import PageRouter from "./router/PageRouter";
import { Header, Footer } from "./components";
import WhatsAppIcon from "./components/wssp/WhatsAppIcon";
import "./App.css";

function App() {
  /*  const defaultText = "¡Hola! Estoy interesado en tus productos."; */
  return (
    <>
      <Header />
      <div className="pages">
        <PageRouter />
      </div>
      <WhatsAppIcon />
      <Footer />
    </>
  );
}

export default App;
