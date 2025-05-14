import React from "react";
import Country from "./Country";

function Results({ filteredCountries, showCountry }) {
  if (filteredCountries === null) return;

  if (filteredCountries.length === 0) {
    return <p>No countries found</p>;
  }

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return <Country countryData={country} />;
  }
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (filteredCountries.length <= 10) {
    return filteredCountries.map((country) => {
      return (
        <div key={country.area}>
          <p>{country.name.common}</p>
          <button onClick={() => showCountry([country])}>Show</button>
        </div>
      );
    });
  }
}

export default Results;
