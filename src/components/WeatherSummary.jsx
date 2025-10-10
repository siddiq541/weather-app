import React from 'react';
import DayCard from './DayCard';

const WeatherSummary = ({ weatherData }) => {
  // Sample weather data for 7 days (this would typically come from props or API)
  const sampleWeatherData = [
    {
      date: '2025-10-08',
      icon: '☀️',
      summary: 'Sunny and clear',
      tempMax: 75,
      tempMin: 58,
      windSpeed: 8
    },
    {
      date: '2025-10-09',
      icon: '⛅',
      summary: 'Partly cloudy',
      tempMax: 72,
      tempMin: 55,
      windSpeed: 12
    },
    {
      date: '2025-10-10',
      icon: '🌧️',
      summary: 'Light rain',
      tempMax: 68,
      tempMin: 52,
      windSpeed: 15
    },
    {
      date: '2025-10-11',
      icon: '⛈️',
      summary: 'Thunderstorms',
      tempMax: 65,
      tempMin: 48,
      windSpeed: 20
    },
    {
      date: '2025-10-12',
      icon: '🌤️',
      summary: 'Mostly sunny',
      tempMax: 70,
      tempMin: 53,
      windSpeed: 10
    },
    {
      date: '2025-10-13',
      icon: '☁️',
      summary: 'Cloudy',
      tempMax: 67,
      tempMin: 50,
      windSpeed: 14
    },
    {
      date: '2025-10-14',
      icon: '🌦️',
      summary: 'Scattered showers',
      tempMax: 63,
      tempMin: 47,
      windSpeed: 18
    }
  ];

  // Use provided weather data or fall back to sample data
  const displayData = weatherData || sampleWeatherData;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        7-Day Weather Forecast
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {displayData.slice(0, 7).map((dayData, index) => (
          <DayCard
            key={`${dayData.date}-${index}`}
            date={dayData.date}
            icon={dayData.icon}
            summary={dayData.summary}
            tempMax={dayData.tempMax}
            tempMin={dayData.tempMin}
            windSpeed={dayData.windSpeed}
          />
        ))}
      </div>
      
      {displayData.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No weather data available
        </div>
      )}
    </div>
  );
};

export default WeatherSummary;