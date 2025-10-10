'use client';
import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const GEO_API_KEY = 'c675a60b384197ee49b63a477a54c5f4';

export default function LocationSelector({ onCityFound }) {
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${GEO_API_KEY}`
      );

      if (!response.data || response.data.length === 0) {
        throw new Error('City not found');
      }

      const { lat, lon, name, country } = response.data[0];
      onCityFound({ lat, lon, name, country });
    } catch (err) {
      console.error('Location fetch error:', err.message);
      setError('City not found. Please check the spelling or try a nearby location.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <div className="flex gap-2">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="border p-2 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-400"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-black p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
}

LocationSelector.propTypes = {
  onCityFound: PropTypes.func.isRequired,
};

