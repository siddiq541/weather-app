'use client';
import { useEffect, useState } from 'react';
import LocationSelector from '../components/LocationSelector';
import { getWeather } from '../lib/weatherService';

export default function Page() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCity) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getWeather(selectedCity.lat, selectedCity.lon);
        setWeather(data);
      } catch (err) {
        setError('Unable to fetch weather data.');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCity]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white flex flex-col items-center justify-start p-6">
      <div className="mt-20 w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 border border-white/20">
        <h1 className="text-3xl font-bold text-center mb-4 tracking-wide">
          🌤️ Weather Snapshot
        </h1>
        <p className="text-center text-sm text-white/80 mb-6">
          Search for a city to see the forecast
        </p>

        <LocationSelector onCityFound={setSelectedCity} />

        {loading && (
          <p className="mt-4 text-center text-white/70 animate-pulse">Loading weather data...</p>
        )}

        {error && (
          <p className="mt-4 text-red-400 text-center">{error}</p>
        )}

        {selectedCity && weather && (
          <>
            <div className="mt-6 bg-white/10 p-4 rounded-lg border border-white/20">
              <h2 className="text-xl font-semibold mb-2">Current Weather</h2>
              <p>City: {selectedCity.name}, {selectedCity.country}</p>
              <p>Temperature: {weather.current_weather.temperature}°C</p>
              <p>Wind Speed: {weather.current_weather.windspeed} km/h</p>
              <p>Time: {weather.current_weather.time}</p>
            </div>

            <div className="mt-4 bg-white/10 p-4 rounded-lg border border-white/20">
              <h2 className="text-xl font-semibold mb-2">Next 7 Hours</h2>
              <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                {weather.hourly.time.slice(0, 7).map((time, index) => (
                  <div
                    key={time}
                    className="min-w-[80px] bg-white/20 rounded-md p-2 text-center shadow-sm"
                  >
                    <p className="text-sm">
                      {new Date(time).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-lg font-semibold">
                      {weather.hourly.temperature_2m[index]}°C
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

