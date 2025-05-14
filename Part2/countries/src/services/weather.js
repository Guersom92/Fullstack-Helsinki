import axios from "axios";

const getWeather = (lat, lon) => {
  const api_key = import.meta.env.VITE_SOME_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
  const request = axios.get(url);
  return request.then((response) => response.data);
};

export default getWeather;
