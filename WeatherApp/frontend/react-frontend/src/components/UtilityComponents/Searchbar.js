import React, { useState } from 'react';

/**
 * SearchBar-komponentti
 *
 * Props:
 * @param {string} placeholder – Teksti hakukentän placeholder-attribuutissa (oletus: "Hae kaupunkia…").
 * @param {(query: string) => void} onSearch – Funktio, jota kutsutaan, kun käyttäjä painaa Enteriä tai klikkaa hakupainiketta.
 *
 * Toiminta:
 * - Renderöi tekstikentän ja hakupainikkeen.
 * - Kuuntelee Enter-näppäintä ja napin klikkauksia.
 * - Validioi, että syöte ei ole tyhjä ennen kutsua onSearch.
 *
 * Jatkokehitys:
 * - Debounce syötteelle (esim. 300 ms) autocomplete-tukea varten.
 * - Historianäkymä: näytä viimeisimmät haut pudotusvalikossa.
 */
function SearchBar({ placeholder = "Hae kaupunkia…", onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = e => setQuery(e.target.value);

  const handleSearch = () => {
    if (query.trim()) onSearch(query.trim());
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Hae</button>
    </div>
  );
}

export default SearchBar;
