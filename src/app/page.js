"use client";
import LocationSelector from "@/components/LocationSelector";
import WeatherSummary from "@/components/WeatherSummary";
import { useEffect, useState } from "react";
import { getWeather } from "../lib/weatherService";
import { getWeatherSummary, getBackgroundClass } from "../lib/weatherUtils";
export default function Page() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bgClass, setBgClass] = useState("default-bg");
  const [weatherData, setWeatherData] = useState(null);
  // 🌦️ Assign CSS class instead of static image

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCity) return;
      setLoading(true);
      setError(null);

      try {
        const data = await getWeather(selectedCity.lat, selectedCity.lon);
        if (!data) throw new Error("Weather data unavailable");

        setWeather(data.current);
        setWeatherData(data.daily);

        const code = data.current?.weathercode || data.daily[0]?.weatherCode;
        setBgClass(getBackgroundClass(code));
      } catch (err) {
        setError(err.message || "Unable to fetch weather data.");
        setWeather(null);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCity]);

  return (
    <main
      className={`min-h-screen text-white flex flex-col items-center justify-start p-6 transition-all duration-1000 bg-cover bg-center ${bgClass} `}
    >
      <div className="w-full max-w-md p-6 mt-20 border shadow-lg bg-black/50 backdrop-blur-md rounded-xl border-white/20">
        <h1 className="mb-4 text-3xl font-bold tracking-wide text-center">
          🌤️ Weather Snapshot
        </h1>
        <p className="mb-6 text-sm text-center text-white/80">
          Search for a city to see the forecast
        </p>

        <LocationSelector onCityFound={setSelectedCity} />

        {loading && (
          <p className="mt-4 text-center text-white/70 animate-pulse">
            Loading weather data...
          </p>
        )}

        {error && <p className="mt-4 text-center text-red-400">{error}</p>}

        {selectedCity && weather && (
          <div className="p-4 mt-6 border rounded-lg bg-white/10 border-white/20">
            <h2 className="mb-2 text-xl font-semibold">Current Weather</h2>
            <p>
              City: {selectedCity.name}, {selectedCity.country}
            </p>
            <p>
              Temperature: {console.log(weather)}
              {weather?.temperature !== undefined
                ? `${weather.temperature}°C`
                : "Unavailable"}
            </p>
            <p>
              Wind Speed:{" "}
              {weather?.windspeed !== undefined
                ? `${weather.windspeed} km/h`
                : "Unavailable"}
            </p>
            <p>
              Weather:{" "}
              {weather?.weatherCode !== undefined
                ? getWeatherSummary(weather.weatherCode)
                : "Unavailable"}
            </p>
            <p>Time: {weather.time ?? "Unavailable"}</p>
          </div>
        )}
      </div>

      {selectedCity && (
        <div className="w-full max-w-6xl mt-8 fade-in">
          <WeatherSummary weatherData={weatherData} />
        </div>
      )}
    </main>
  );
}
