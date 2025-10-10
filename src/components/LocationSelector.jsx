'use client';
import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

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
      // Geocode the city name
      const geoRes = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
      const geoData = geoRes.data;

     
      if (!geoData || !geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Pass location data to parent
      onCityFound({ lat: latitude, lon: longitude, name, country });
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

