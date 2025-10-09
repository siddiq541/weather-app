import React from 'react';
import DayCard from './DayCard';

/**
 * Demo component to showcase the DayCard component with various weather conditions
 */
const DayCardDemo = () => {
  const weatherExamples = [
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
      summary: 'Light rain expected',
      tempMax: 68,
      tempMin: 52,
      windSpeed: 15
    },
    {
      date: '2025-10-11',
      icon: '⛈️',
      summary: 'Thunderstorms likely',
      tempMax: 65,
      tempMin: 48,
      windSpeed: 20
    }
  ];

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        DayCard Component Demo
      </h1>
      
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Single Card Example:
        </h2>
        
        <div className="mb-8 max-w-xs">
          <DayCard {...weatherExamples[0]} />
        </div>

        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Multiple Cards Grid:
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {weatherExamples.map((example, index) => (
            <DayCard
              key={`demo-${index}`}
              {...example}
            />
          ))}
        </div>

        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Component Features:
          </h3>
          <ul className="text-gray-700 dark:text-gray-300 space-y-1">
            <li>• Responsive design with Tailwind CSS</li>
            <li>• Dark mode support</li>
            <li>• Weather icon display</li>
            <li>• Temperature range (max/min)</li>
            <li>• Wind speed indicator</li>
            <li>• Formatted date display</li>
            <li>• Hover effects and transitions</li>
            <li>• Accessibility features</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DayCardDemo;