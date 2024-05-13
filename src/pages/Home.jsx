import "../styles/home/products.css";
import Card from "../components/Home/Card";
import { useGlobalContext } from "../context/GlobalContextProvider";
import Carousel from "../components/Home/Carousel";
/* import { productsScargo } from "../../productsScargo"; */

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID =
  "991953421584-8pnh3c4g8kqfluj01fai2109afeugao2.apps.googleusercontent.com";
const API_KEY = "AIzaSyDNkUT72JpaGJwZO-lOKN3pg_XugK2m_T4";

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC =
  "https://sheets.googleapis.com/$discovery/rest?version=v4";

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById("gapi").addEventListener("load", gapiLoaded());
document.getElementById("gis").addEventListener("load", gisLoaded());

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  // eslint-disable-next-line no-undef
  gapi.load("client", initializeGapiClient);
}
/* Callback after the API client is loaded. Loads the discovery doc to initialize the API. */
async function initializeGapiClient() {
  // eslint-disable-next-line no-undef
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

/* Callback after Google Identity Services are loaded. */
function gisLoaded() {
  // eslint-disable-next-line no-undef
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "", // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

/* Enables user interaction after all libraries are loaded. */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById("authorize_button").style.visibility = "visible";
  }
}

/* Sign in the user upon button click. */
const handleAuthClick = () => {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }

    await getTurnos();
    /* await getProductos(); */
  };

  // eslint-disable-next-line no-undef
  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: "" });
  }
};

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */

const hojaTurnos = "Turnos";

let turnos;

async function getDataFromSheet(hoja) {
  let response;
  try {
    // eslint-disable-next-line no-undef
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: "1ZCUQWYMLJ_Yad620mI_zUCXSHbT-1naBDFPp1WMwP9Q",
      range: `${hoja}!A:G`,
    });
  } catch (err) {
    console.error(err);
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    console.warn(`No se encontraron valores en la hoja ${hoja}`);
    return;
  }

  const data = [];
  const headers = range.values[0];

  console.log("headers:", headers);
  /* console.log("range.values:", range.values); */
  /* console.log(`range.values[0].length:`, range.values[0].length);
  console.log(`range.values[0]:`, range.values[0]);
  console.log(`range.values[0][0]:`, range.values[0][0]);
  console.log(`range.values.length:`, range.values.length);
  console.log(`range.values:`, range.values); */

  range.values.forEach((fila) => {
    const newData = {};
    fila.forEach((valor, index) => {
      newData[headers[index].toLowerCase().replace(/\s+/g, "_")] = valor || ""; // Convertir a minúsculas y reemplazar espacios con guiones bajos en las claves
    });
    data.push(newData);
  });

  /*  range.values.forEach((fila) => {
    
    const newData = range.values[0].forEach((col) => {
      col: fila;
    });
    turnos.push(newData);
  }); */

  /* range.values.forEach((fila) => {
    if (isNaN(parseInt(fila[0]))) return;
    const newData = {
      id: fila[0],
      cliente: fila[1],
      email: fila[2],
      modelo: fila[3],
      problema: fila[4],
      fecha_terminado: fila[5],
      comentario: fila[6],
    };
    turnos.push(newData);
  }); */
  /*  console.log(`${hoja} turnos:`, turnos); */
  /* return turnos; */
  return data;
  /* return range.values; */
}

async function getTurnos() {
  turnos = await getDataFromSheet(hojaTurnos);
  console.log("getTurnos:", turnos);
}

const Home = () => {
  const { prodSearch } = useGlobalContext();
  return (
    <div className="home">
      <div className="divImage">
        <img
          className="imageBienvenidos"
          src="/imagenes/bienvenidoScargo.png"
          alt=""
        />
      </div>

      <Carousel />
      <button id="authorize_button" onClick={handleAuthClick}>
        Authorize
      </button>
      <div className="products">
        {prodSearch.map(
          ({ category, title, id, price, description, images }) => (
            <Card
              categoria={category}
              nombre={title}
              id={id}
              precio={price}
              key={id}
              description={description}
              images={images}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
