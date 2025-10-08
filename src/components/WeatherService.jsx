export async function getWeather(lat, lon) {
  if (!lat || !lon) {
    throw new Error('Latitude and longitude are required');
  }

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m&temperature_unit=celsius&windspeed_unit=kmh&timezone=auto`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Weather API response:', data);

    if (!data || !data.daily || !data.current_weather) {
      throw new Error('Incomplete weather data received');
    }

    return data;
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    throw new Error('Unable to fetch weather data. Please try again later.');
  }
}
