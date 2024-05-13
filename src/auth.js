// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID =
  "991953421584-8pnh3c4g8kqfluj01fai2109afeugao2.apps.googleusercontent.com";
const API_KEY = "AIzaSyDNkUT72JpaGJwZO-lOKN3pg_XugK2m_T4";
const DISCOVERY_DOC =
  "https://sheets.googleapis.com/$discovery/rest?version=v4";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById("gapi").addEventListener("load", gapiLoaded());
document.getElementById("gis").addEventListener("load", gisLoaded());

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

function gapiLoaded() {
  gapi.load("client", initializeGapiClient);
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "",
  });
  gisInited = true;
  maybeEnableButtons();
}

function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById("authorize_button").style.visibility = "visible";
  }
}

const handleAuthClick = () => {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }

    await getTurnos();
    await getProducts();
    await getEntradas();
    await getSalidas();
    await getInventario();
  };

  if (gapi.client.getToken() === null) {
    tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    tokenClient.requestAccessToken({ prompt: "" });
  }
};

export { handleAuthClick };

const hojaTurnos = "Turnos";
const hojaProducts = "Productos";
const hojaEntradas = "Entradas";
const hojaSalidas = "Salidas";
const hojaInventario = "Inventario";

let turnos;

async function getDataFromSheet(hoja) {
  let response;
  try {
    // eslint-disable-next-line no-undef
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: "1ZCUQWYMLJ_Yad620mI_zUCXSHbT-1naBDFPp1WMwP9Q",
      range: `${hoja}!A:K`,
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

  range.values.forEach((fila) => {
    const newData = {};
    fila.forEach((valor, index) => {
      newData[headers[index].toLowerCase().replace(/\s+/g, "_")] = valor || ""; // Convertir a minúsculas y reemplazar espacios con guiones bajos en las claves
    });
    data.push(newData);
  });

  console.log("data:", data);
  return data;
  /* return range.values; */
}

async function writeDataToSheet(sheetName, formData) {
  // Obtener el rango de celdas donde se escribirán los datos
  const range = `${sheetName}!A:G`; // Rango de las tres primeras columnas, ajusta según tu hoja

  // Obtener los valores actuales en la hoja
  const response = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: "1ZCUQWYMLJ_Yad620mI_zUCXSHbT-1naBDFPp1WMwP9Q", // Reemplaza con el ID de tu hoja
    range: range,
  });

  const values = response.result.values || [];
  let nextId = 1; // Valor predeterminado si no hay datos aún

  if (values.length > 0) {
    // Obtener el máximo ID actual
    const maxId = Math.max(...values.map((row) => Number(row[0])));
    nextId = maxId + 1;
  }

  // Crear la nueva fila con el ID incrementado
  const newRow = [
    values.length,
    formData.nroRef,
    formData.nombre,
    formData.nroRef2,
  ];
  console.log("newRow", newRow);
  const newRange = `${sheetName}!A${values.length + 1}:D${values.length + 1}`;

  try {
    const appendResponse = await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: "1ZCUQWYMLJ_Yad620mI_zUCXSHbT-1naBDFPp1WMwP9Q", // Reemplaza con el ID de tu hoja
      range: newRange,
      valueInputOption: "RAW",
      resource: { values: [newRow] },
    });

    console.log("Datos escritos en la hoja:", appendResponse);
  } catch (error) {
    console.error("Error al escribir datos en la hoja:", error);
    throw error;
  }
}

export { writeDataToSheet };

async function getTurnos() {
  turnos = await getDataFromSheet(hojaTurnos);
}

export async function getProducts() {
  turnos = await getDataFromSheet(hojaProducts);

  return turnos;
}

export async function getEntradas() {
  const dataEntradas = await getDataFromSheet(hojaEntradas);
  console.log("dataEntradas:", dataEntradas);
  return dataEntradas;
}

export async function getSalidas() {
  const dataSalidas = await getDataFromSheet(hojaSalidas);
  console.log("dataEntradas:", dataSalidas);
  return dataSalidas;
}

export async function getInventario() {
  const dataInventario = await getDataFromSheet(hojaInventario);
  console.log("dataEntradas:", dataInventario);
  return dataInventario;
}
