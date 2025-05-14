import React, { useEffect, useState } from "react";
import getWeather from "../services/weather";

function Country({ countryData }) {
  const [weather, setWeather] = useState(null);

  const latitude = countryData.latlng[0];
  const longitude = countryData.latlng[1];

  useEffect(() => {
    getWeather(latitude, longitude)
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => console.log(error));
  }, [latitude, longitude]);

  return (
    <>
      <h1>{countryData.name.common}</h1>
      <p>Capital {countryData.capital[0]}</p>
      <p>Area {countryData.area} m²</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(countryData.languages).map((lang, index) => {
          return <li key={index}>{lang}</li>;
        })}
      </ul>
      <img src={countryData.flags.png} alt={countryData.flags.alt} />
      <h2>Weather in {countryData.name.common}</h2>
      {weather && (
        <div>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </>
  );
}

export default Country;
