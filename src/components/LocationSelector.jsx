import { useState } from 'react';
import axios from 'axios';

export default function SearchBar({ onCityFound }) {
  const [city, setCity] = useState('');

  const handleSearch = async () => {
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=YOUR_API_KEY`);
    const { lat, lon } = response.data[0];
    onCityFound({ lat, lon, name: city });
  };

  return (
    <div className="search-bar">
      <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city..." />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}