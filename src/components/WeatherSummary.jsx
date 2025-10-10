import React from "react";
import DayCard from "./DayCard";
import { getWeatherSummary, getWeatherIcon } from "../lib/weatherUtils";

const WeatherSummary = ({ weatherData }) => {
  if (!weatherData || weatherData.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
        No weather data available
      </div>
    );
  }

  // Map weatherCode → Emoji/Icon

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        7-Day Weather Forecast
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {weatherData.slice(0, 7).map((day, index) => (
          <DayCard
            key={`${day.date}-${index}`}
            date={day.date}
            icon={getWeatherIcon(day.weatherCode)}
            summary={getWeatherSummary(day.weatherCode)}
            tempMax={day.tempMax}
            tempMin={day.tempMin}
            windSpeed={day.windSpeed}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherSummary;
