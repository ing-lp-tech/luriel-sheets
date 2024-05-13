import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types, no-unused-vars
const Card = ({ categoria, nombre, precio, id, description, images }) => {
  return (
    <div className="card">
      {/*  <div className="wave"> */}
      <Link to={"/detail/" + id}>
        <h2>{nombre}</h2>
        <img src={images[0]} />
        <h4>${precio}</h4>
        {/* <Link to={"/detail/" + id}>Ver detalle</Link> */}
      </Link>
    </div>
  );
};
export default Card;
