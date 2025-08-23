export async function fetchWeather(location: string) {
  const apikey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
  if (!apikey) {
    throw new Error('Weather API key is not defined');
  }
  const url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${location}&aqi=no`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      location: data.location.name,
      region: data.location.region,
      country: data.location.country,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      icon: data.current.condition.icon,
      // add forecasts if needed in future
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
}
