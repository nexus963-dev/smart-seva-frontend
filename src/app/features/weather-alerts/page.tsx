'use client';

import { useState } from "react";

// TypeScript interfaces for better type safety
interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        condition: {
          text: string;
          icon: string;
        };
        maxtemp_c: number;
        mintemp_c: number;
        daily_chance_of_rain: number;
      };
    }>;
  };
  alerts?: {
    alert: Array<{
      headline: string;
      desc: string;
      severity: string;
    }>;
  };
}

// Updated fetch function to get complete weather data
export async function fetchWeather(location: string): Promise<WeatherData> {
  const apikey = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
  if (!apikey) {
    throw new Error('Weather API key is not defined');
  }
  
  // Use forecast.json to get current, forecast, and alerts data
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${encodeURIComponent(location)}&days=7&alerts=yes`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
}

export default function WeatherWidget() {
  const [location, setLocation] = useState("Allahabad");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeather(location.trim());
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFetch();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-green-700 mb-2">🌦️ Weather Forecast</h2>
        <p className="text-gray-600">Get real-time weather updates for your farm location</p>
      </div>

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your location (city, coordinates, or postal code)
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., Pune, Mumbai, 18.5204,73.8567"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            disabled={loading}
          />
        </div>
        <button
          onClick={handleFetch}
          disabled={loading}
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold rounded-lg hover:scale-105 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            </div>
          ) : (
            'Get Weather'
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-medium">❌ {error}</p>
        </div>
      )}

      {/* Weather Display */}
      {weather && (
        <div className="space-y-6">
          {/* Current Weather */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {weather.location.name}, {weather.location.region}
                </h3>
                <p className="text-gray-600">{weather.location.country}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <img 
                    src={`https:${weather.current.condition.icon}`} 
                    alt={weather.current.condition.text}
                    className="w-16 h-16"
                  />
                  <span className="text-4xl font-bold text-blue-600">
                    {weather.current.temp_c}°C
                  </span>
                </div>
                <p className="text-gray-700 font-medium">{weather.current.condition.text}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="text-lg font-semibold text-blue-600">{weather.current.humidity}%</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-gray-600">Wind Speed</p>
                <p className="text-lg font-semibold text-blue-600">{weather.current.wind_kph} km/h</p>
              </div>
            </div>
          </div>

          {/* Weather Alerts */}
          {weather.alerts?.alert && weather.alerts.alert.length > 0 && (
            <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
              <h4 className="text-xl font-bold text-red-700 mb-4">⚠️ Weather Alerts</h4>
              <div className="space-y-3">
                {weather.alerts.alert.map((alert, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg border-l-4 border-red-500">
                    <h5 className="font-bold text-red-800 mb-2">{alert.headline}</h5>
                    <p className="text-red-700 text-sm">{alert.desc}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
                      {alert.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7-Day Forecast */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-gray-800 mb-4">📅 7-Day Forecast</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
              {weather.forecast.forecastday.map((day, idx) => (
                <div key={day.date} className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    {idx === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                  </p>
                  <img 
                    src={`https:${day.day.condition.icon}`} 
                    alt={day.day.condition.text}
                    className="w-12 h-12 mx-auto mb-2"
                  />
                  <p className="text-xs text-gray-600 mb-2">{day.day.condition.text}</p>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">
                      {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
                    </p>
                    <p className="text-xs text-blue-600">
                      🌧️ {day.day.daily_chance_of_rain}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-sm text-green-700">
          💡 <strong>Tip:</strong> You can search by city name (e.g., "Mumbai"), coordinates (e.g., "18.5204,73.8567"), 
          or postal code for more accurate results for your farm location.
        </p>
      </div>
    </div>
  );
}