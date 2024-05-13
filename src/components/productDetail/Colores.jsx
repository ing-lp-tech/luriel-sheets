/* eslint-disable react/prop-types */
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// eslint-disable-next-line react/prop-types

const theme = createTheme({
  palette: {
    color: {
      blue: "blue",
      black: "black",
      grey: "grey",
      pink: "pink",
    },
  },
});
const Colores = ({ colores }) => {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={2} justifyContent={"center"}>
        {colores.map((color, index) => (
          <>
            {/* <Box
              key={index}
              sx={{
                borderColor: { color },
                color: { color },
                borderRadius: 2,
              }}
              variant="rounded"
            >
              <span className="talla-value">{color}</span>
            </Box> */}
            {/* <Fab color={color} aria-label="edit">
              <span className="talla-value">{color}</span>
            </Fab> */}
            <Fab
              key={index}
              sx={{
                bgcolor: theme.palette.color[color],
                width: 80,
                height: 20,
                zIndex: 1,
              }}
              aria-label="edit"
            >
              {/* <span className="talla-value">{color}</span> */}
            </Fab>
          </>
        ))}
      </Stack>
    </ThemeProvider>
  );
};

export default Colores;
