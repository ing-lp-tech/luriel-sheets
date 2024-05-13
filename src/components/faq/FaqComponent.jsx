import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqSectionStyle = {
  marginTop: "80px",
  marginBottom: "80px",
};

const faqData = [
  {
    question: "¿Cómo hago un pedido?",
    answer:
      "Para hacer un pedido, simplemente navega por nuestro catálogo, selecciona los productos que te gusten y agrégalos al carrito de compras. Luego, ve al carrito y sigue los pasos para finalizar tu pedido.",
  },
  {
    question: "¿Cuál es la política de devoluciones?",
    answer:
      "Nuestra política de devoluciones te permite devolver cualquier artículo no usado en un plazo de 30 días desde la fecha de compra. Por favor, consulta nuestra página de Política de Devoluciones para obtener más detalles.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos tarjetas de crédito/débito, PayPal y otras formas de pago seguras. Puedes ver todas las opciones de pago durante el proceso de compra.",
  },
];

const FaqComponent = () => {
  return (
    <div>
      {" "}
      <Container style={faqSectionStyle}>
        <Grid container spacing={2}>
          {faqData.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-header-${index}`}
                >
                  <Typography variant="h6">{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default FaqComponent;
