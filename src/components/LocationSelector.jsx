"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default function LocationSelector({ onCityFound }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch city suggestions as user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            city
          )}&count=10&language=en&format=json`
        );
        setSuggestions(res.data.results || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Geocoding error:", err.message);
        setSuggestions([]);
        setShowDropdown(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300); // debounce input
    return () => clearTimeout(debounce);
  }, [city]);

  const handleSelect = (location) => {
    const { latitude: lat, longitude: lon, name, country, admin1 } = location;
    onCityFound({ lat, lon, name, country, admin1 });
    setCity(`${name}, ${admin1 || ""}, ${country}`);
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative flex flex-col items-center w-full gap-2 mx-auto mt-4 sm:w-80">
      <input
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setError(null);
        }}
        placeholder="Start typing a city name..."
        className="w-full p-2 text-black placeholder-gray-400 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 overflow-y-auto text-black bg-white border border-gray-300 rounded shadow-lg top-full max-h-60">
          {suggestions.map((loc, index) => (
            <li
              key={`${loc.id}-${index}`}
              onClick={() => handleSelect(loc)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            >
              {loc.name}
              {loc.admin1 ? `, ${loc.admin1}` : ""}, {loc.country}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-sm text-center text-red-500">{error}</p>}
    </div>
  );
}

LocationSelector.propTypes = {
  onCityFound: PropTypes.func.isRequired,
};
