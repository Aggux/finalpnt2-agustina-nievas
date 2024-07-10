import axios from "axios";

const URL = "https://api.bluelytics.com.ar/v2/latest";

export async function getValores() {
  try {
    const { data: Valores } = await axios.get(URL);
    return Valores;
  } catch (error) {
    console.error("Error productos GET:", error);
    return [];
  }
}
