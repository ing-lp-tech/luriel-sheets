import { Route, Routes } from "react-router-dom";
import {
  Contact,
  Home,
  ProductDetail,
  Faq,
  ComoComprar,
  Ingresar,
  Login,
  PrivatePage,
  Products,
} from "../pages";
import { Error404 } from "../components";
import { useGlobalContext } from "../context/GlobalContextProvider";

const PageRouter = () => {
  const { isLoggedIn } = useGlobalContext();
  return (
    <>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/usuarios_registrados" element={<PrivatePage />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/comoComprar" element={<ComoComprar />} />
            <Route path="/ingresar" element={<Ingresar />} />
            <Route path="/detail/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/comoComprar" element={<ComoComprar />} />
            <Route path="/ingresar" element={<Ingresar />} />
            <Route path="/detail/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
        <Route
          path="*"
          element={<Error404 mensaje={"La ruta buscada no existe"} />}
        />
      </Routes>
    </>
  );
};

export default PageRouter;
