import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const getWeather = async (latitude, longitude) => {
  if (!latitude || !longitude)
    throw new Error("Latitude and longitude required");

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        latitude,
        longitude,
        current_weather: true,
        daily:
          "temperature_2m_max,temperature_2m_min,windspeed_10m_max,weathercode,precipitation_sum",
        temperature_unit: "celsius",
        windspeed_unit: "kmh",
        timezone: "auto",
        forecast_days: 7,
      },
    });

    const data = response.data;

    if (!data.current_weather || !data.daily) return null;

    // Format current time in local timezone using API's timezone
    const now = new Date();
    const formattedTime = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: data.timezone,
    }).format(now);

    // Transform daily data into array of objects
    const dailyForecast = data.daily.time.map((date, i) => ({
      date,
      tempMax: data.daily.temperature_2m_max[i],
      tempMin: data.daily.temperature_2m_min[i],
      windSpeed: data.daily.windspeed_10m_max[i],
      weatherCode: data.daily.weathercode[i],
      precipitation: data.daily.precipitation_sum[i],
    }));

    return {
      current: {
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        weatherCode: data.current_weather.weathercode,
        time: formattedTime, // ✅ formatted local time
      },
      daily: dailyForecast,
      timezone: data.timezone,
      latitude: data.latitude,
      longitude: data.longitude,
      elevation: data.elevation,
    };
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    return null;
  }
};
