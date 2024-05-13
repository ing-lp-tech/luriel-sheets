import { useParams } from "react-router-dom";
/* import { products } from "../productsDB"; */
import { Error404 } from "../components";
import { useGlobalContext } from "../context/GlobalContextProvider";
import { productsScargo } from "../productsScargo";
import "../styles/productDetail/productDetail.css";

import Medidas from "../components/productDetail/Medidas";
/* import Colores from "../components/productDetail/Colores"; */

const ProductDetail = () => {
  /* const {id} = useParams()  desestrucutramos al id, forma alt mejor*/
  const rute = useParams();
  const { cart } = useGlobalContext();

  const productFound = productsScargo.find(
    (product) => product.id === Number(rute.id)
  );

  /*  {
    cart ? console.log(cart[0].quantity, "productFound:", productFound) : null;
  } */
  /*   const productFoundInCart =
    cart.length > 0
      ? cart.find((product) => product.id === productFound.id)
      : "";
 */
  /*   const cantidadObjetosId = cart.filter(
    (producto) => producto.id === productFound.id
  ).length; */

  const cantidadObjetosId = cart.reduce(
    (total, producto) =>
      producto.id === productFound.id ? total + producto.cantidad : total,
    0
  );

  return (
    <div>
      {productFound ? (
        <div className="details">
          <div className="produtsDetail">
            <div className="productImage">
              <h2>{productFound.title}</h2>
              <img src={productFound.images[0]} />
            </div>

            <div className="productDescription">
              <h2>Descripcion: {productFound.description}</h2>
              <h3>Talles:</h3>
              <Medidas talles={productFound.stock} />
              {/* <h3>Colores:</h3>
              <Colores colores={productFound.colores} /> */}
              <h3>
                Precio: $ {productFound.price} c/u
                {/* {productFoundInCart ? productFoundInCart.quantity : ""} */}
              </h3>
              <h3>Cantidad:{cantidadObjetosId}</h3>
              {/* <h3>Añadir al carrito:</h3>
              <div>
                <Fab
                  sx={{
                    zIndex: 0,
                  }}
                  size="medium"
                  color="primary"
                  aria-label="add"
                >
                  <AddIcon onClick={() => handleAddProduct(productFound.id)} />{" "}
                </Fab>
                <Fab
                  sx={{
                    zIndex: 0,
                  }}
                  size="medium"
                  color="primary"
                  aria-label="add"
                >
                  <RemoveIcon
                    onClick={() => handleRemoveProduct(productFound.id)}
                  />{" "}
                </Fab>
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <Error404 mensaje={"El producto buscado no existe"} />
      )}
    </div>
  );
};

export default ProductDetail;
