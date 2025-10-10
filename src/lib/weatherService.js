import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const getWeather = async (latitude = 52.52, longitude = 13.41) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        latitude,
        longitude,
        current_weather: true, // fetch current temperature & wind
        daily:
          "temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max",
        timezone: "auto",
        forecast_days: 7,
      },
    });
    console.log("API response:", response.data); // ✅ logs the full JSON
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching weather:",
      error.response?.status,
      error.message
    );
    return null;
  }
};
