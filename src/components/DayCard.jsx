import React from 'react';

const DayCard = ({ date, icon, summary, tempMax, tempMin, windSpeed }) => {
  // Format the date to show day of week
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format temperature with degree symbol
  const formatTemp = (temp) => {
    return `${Math.round(temp)}°`;
  };

  // Format wind speed
  const formatWindSpeed = (speed) => {
    return `${Math.round(speed)} mph`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
      {/* Date */}
      <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
        {formatDate(date)}
      </div>

      {/* Weather Icon and Summary */}
      <div className="flex items-center mb-3">
        <div className="text-4xl mr-3" role="img" aria-label={summary}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-tight">
            {summary}
          </div>
        </div>
      </div>

      {/* Temperature Range */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-bold text-gray-900 dark:text-white">
          {formatTemp(tempMax)}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {formatTemp(tempMin)}
        </div>
      </div>

      {/* Wind Speed */}
      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
        <svg 
          className="w-3 h-3 mr-1" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path 
            fillRule="evenodd" 
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" 
            clipRule="evenodd" 
          />
        </svg>
        Wind: {formatWindSpeed(windSpeed)}
      </div>
    </div>
  );
};

export default DayCard;
