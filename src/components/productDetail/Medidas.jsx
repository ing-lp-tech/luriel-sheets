/* import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box"; */
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useGlobalContext } from "../../context/GlobalContextProvider";
import Stack from "@mui/material/Stack";
import { productsScargo } from "../../productsScargo";
import { useParams } from "react-router-dom";
import "../../styles/productDetail/medidas.css";
// eslint-disable-next-line react/prop-types
const Medidas = ({ talles }) => {
  /* const [counts, setCounts] = useState(
    Object.fromEntries(Object.keys(talles).map((talla) => [talla, 0]))
  ); */
  const rute = useParams();
  const { handleAddProduct, handleRemoveProduct, cart } = useGlobalContext();

  const productFound = productsScargo.find(
    (product) => product.id === Number(rute.id)
  );

  /* const handleDecrease = (talla) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [talla]: Math.max(prevCounts[talla] - 1, 0),
    }));
  };

  const handleIncrease = (talla) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [talla]: prevCounts[talla] + 1,
    }));
  }; */

  const calculateTotalQuantity = () => {
    const totalQuantities = {};

    cart.forEach((item) => {
      const { id, talle, cantidad } = item;

      if (!totalQuantities[id]) {
        totalQuantities[id] = {};
      }

      totalQuantities[id][talle] = (totalQuantities[id][talle] || 0) + cantidad;
    });

    return totalQuantities;
  };

  const totalQuantities = calculateTotalQuantity();

  return (
    <div className="talles">
      {/* <Stack direction="row" spacing={2} justifyContent={"center"}> */}
      <Stack
        direction={{ xs: "column", sm: "row" }} // Cambia la dirección en móvil y desktop
        spacing={2}
        justifyContent={"center"}
      >
        {Object.entries(talles).map(([talla, cantidad]) => (
          <div className="talleIndividual" key={talla}>
            <h4>
              Talle: `{talla}` Stock: ${cantidad}
            </h4>
            <Badge
              color="secondary"
              badgeContent={
                totalQuantities[rute.id]?.[talla] || 0
              } /* badgeContent={counts[talla]} */
            >
              <AddShoppingCartIcon />
            </Badge>

            <ButtonGroup style={{ width: "100%" }}>
              <Button
                aria-label="reduce"
                onClick={() => {
                  /*  handleDecrease(talla); */
                  handleRemoveProduct(productFound.id, talla);
                }}
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Button
                aria-label="increase"
                onClick={() => {
                  /*  handleIncrease(talla); */
                  handleAddProduct(productFound.id, talla);
                }}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </div>
        ))}
      </Stack>
    </div>
  );
};

export default Medidas;
