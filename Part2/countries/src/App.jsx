import React, { useEffect, useState } from "react";
import services from "./services/countries";
import Results from "./components/Results";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [country, setCountry] = useState("");

  useEffect(() => {
    services.getAll().then((data) => setCountries(data));
  }, []);

  const handleChange = (e) => {
    setCountry(e.target.value);
  };

  const searchCountry = (name) => {
    if (name === "") {
      setFilteredCountries(null);
      return;
    }
    const countriesMatched = countries.filter((country) =>
      country.name.common.toLowerCase().includes(name.toLowerCase())
    );

    setFilteredCountries(countriesMatched);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchCountry(country);
  };
  return countries.length > 0 ? (
    <>
      <form onSubmit={handleSubmit}>
        find countries
        <input value={country} onChange={handleChange} />
      </form>

      <Results
        filteredCountries={filteredCountries}
        showCountry={setFilteredCountries}
      />
    </>
  ) : (
    <h1>loading...</h1>
  );
}

export default App;
