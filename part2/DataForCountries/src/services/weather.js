import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = import.meta.env.VITE_SOME_KEY;

const get = (country) => {
  const request = axios.get(
    `${baseUrl}?lat=${country.latlng[0]}&lon=${country.latlng[1]}&lang=en&appid=${apiKey}&units=metric`
  );
  return request.then((response) => response.data);
};

export default {
  get,
};
