import axios from "axios";

const API_URL =
  "https://v6.exchangerate-api.com/v6/0beb96dd63743b57cc23624c/latest/USD";

export const getExchangeRates = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
