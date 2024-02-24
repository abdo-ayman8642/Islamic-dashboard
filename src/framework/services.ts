import axios from "axios";
import { Feature } from "models/api";



export async function fetchServices() {
  const url =
    window.location.protocol + "//" + window.location.host + "/features.json";
  const response = await axios.get<Feature[]>(url);

  return response.data;
}

