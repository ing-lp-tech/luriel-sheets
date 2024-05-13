import "../../styles/wssp/wssp.css";
/* import PropTypes from "prop-types"; */
import { useGlobalContext } from "../../context/GlobalContextProvider";

const WhatsAppIcon = () => {
  const { cart } = useGlobalContext();
  const handleChatOpen = () => {
    // Lógica para abrir el chat de WhatsApp al hacer clic
    /* window.open("https://api.whatsapp.com/send?phone=123456789", "_blank"); */

    /* const textoProductos = newCart.map((producto) => {
      const { title, talles } = producto;
      return `${title} - Cantidad: ${quantity}`;
    }); */

    const textoProductos = newCart.map((producto) => {
      const { id, title, talles } = producto;

      // Crear un array de strings para cada talle con su cantidad
      const tallesText = Object.entries(talles).map(([talleId, talleData]) => {
        const { cantidad } = talleData[0];
        return `Talle ${talleId}: cantidad: ${cantidad}`;
      });

      // Unir el array de talles en un solo string
      const tallesString = tallesText.join(",\n");

      return `id: ${id}, title: "${title}",\n${tallesString}`;
    });

    const textoFinal = `Productos:\n${textoProductos.join("\n")}`;

    const encodedText = encodeURIComponent(textoFinal);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=+5491162020911&text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
  };

  const newCart = cart.reduce((acc, producto) => {
    const existingProduct = acc.find((p) => p.id === producto.id);

    if (existingProduct) {
      // El producto ya existe en newArray
      if (!existingProduct.talles[producto.talle]) {
        existingProduct.talles[producto.talle] = [];
      }

      existingProduct.talles[producto.talle].push({
        cantidad: producto.cantidad,
        precio: producto.precio,
      });
    } else {
      // El producto no existe en newArray, lo agregamos
      const newProduct = {
        id: producto.id,
        title: producto.title,
        description: producto.description,
        images: producto.images,
        precio: producto.precio,
        /*  cantidad: { ? }, */
        talles: {
          [producto.talle]: [
            {
              cantidad: producto.cantidad,
              precio: producto.precio,
            },
          ],
        },
      };
      acc.push(newProduct);
    }

    return acc;
  }, []);

  console.log("newCart:", newCart);

  return (
    <div className="whatsapp-icon" onClick={handleChatOpen}>
      <img
        src="/imagenes/WhatsApp.svg" // Añade tu propia imagen de ícono de WhatsApp
        alt="WhatsApp"
      />
    </div>
  );
};

/* WhatsAppIcon.propTypes = {
  defaultText: PropTypes.string.isRequired,
};
 */
export default WhatsAppIcon;
