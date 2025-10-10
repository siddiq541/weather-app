// utils: map weather codes to text
const getWeatherSummary = (code) => {
  const mapping = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Severe thunderstorm with hail",
  };
  return mapping[code] || "Unknown";
};

const getWeatherIcon = (code) => {
  const icons = {
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    48: "🌫️",
    51: "🌦️",
    61: "🌧️",
    71: "❄️",
    80: "🌦️",
    95: "⛈️",
  };
  return icons[code] || "❓";
};
const getBackgroundClass = (code) => {
  if (!code) return "default-bg";

  if ([0, 1].includes(code)) return "sunny-bg"; // ☀️ Sunny
  if ([2, 3].includes(code)) return "cloudy-bg"; // ☁️ Cloudy
  if ([51, 53, 55, 61, 63, 65].includes(code)) return "rainy-bg"; // 🌧️ Rainy
  if ([71, 73, 75].includes(code)) return "snowy-bg"; // ❄️ Snowy
  if ([95, 96, 99].includes(code)) return "storm-bg"; // ⛈️ Thunderstorm
  return "default-bg";
};
export { getWeatherSummary, getWeatherIcon, getBackgroundClass };
