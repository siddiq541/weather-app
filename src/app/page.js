"use client";

import { useEffect, useState } from "react";
import { getWeather } from "../lib/weatherService";

export default function Page() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeather();
      setWeather(data);
    };
    fetchData();
  }, []);

  if (!weather) return <p>Loading...</p>;

  const { current_weather, hourly } = weather;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Weather Snapshot</h1>

      <div className="mb-4 border p-2 rounded bg-gray-100">
        <h2 className="font-semibold">Current Weather</h2>
        <p>Temperature: {current_weather.temperature}°C</p>
        <p>Wind Speed: {current_weather.windspeed} km/h</p>
        <p>Time: {current_weather.time}</p>
      </div>

      <div className="border p-2 rounded bg-gray-50">
        <h2 className="font-semibold mb-2">Next 7 Hours (Temperature)</h2>
        {hourly.time.slice(0, 7).map((time, index) => (
          <p key={time}>
            {new Date(time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            : {hourly.temperature_2m[index]}°C
          </p>
        ))}
      </div>
    </div>
  );
}
