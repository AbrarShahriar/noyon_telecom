import { NoyonAxios } from "../global";

export const getHotDeals = () => NoyonAxios.get("/offer/all/type/hot");
export const getSpecialDeals = () => NoyonAxios.get("/offer/all/type/special");

export const getWeatherData = ({ lat, long }) =>
  NoyonAxios.get(
    `https://api.weatherapi.com/v1/current.json?key=2a6c72cf74f24a3d80091621232604&q=${lat},${long}&aqi=no`,
    { withCredentials: false }
  );
