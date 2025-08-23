'use client';

import { useState } from "react";
import { fetchWeather } from "@/utils/weather";

interface WeatherData {
  location: string;
  region: string;
  country: string;
  temperature: number;
  condition: string;
  icon: string;
}

export default function WeatherWidget() {
  const [city, setCity] = useState("Pune");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFetch = async () => {
    setErrorMsg('');
    setWeather(null);
    setLoading(true);
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setErrorMsg("Could not fetch weather. Please check the city name.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white max-w-2xl mx-auto p-6 rounded-lg shadow-lg border border-gray-200 mb-8 font-sans">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">🌦️ Weather Forecast & Alerts</h2>
      
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Enter City or Location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-150"
        />
        <button
          onClick={handleFetch}
          className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </div>

      {errorMsg && (
        <p className="text-red-600 text-center mb-4">{errorMsg}</p>
      )}

      {weather && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg shadow-inner flex flex-col items-center sm:flex-row sm:justify-around sm:items-center space-y-4 sm:space-y-0">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-xl font-bold mb-2">{weather.location}, {weather.region}</h3>
            <p className="flex items-center space-x-2">
              <img src={weather.icon} alt={weather.condition} className="w-12 h-12" />
              <span className="text-3xl font-semibold">{weather.temperature}°C</span>
            </p>
            <p className="text-green-600 mt-2">{weather.condition}</p>
          </div>
          
          <div className="text-center sm:text-right">
            <p className="text-sm text-gray-600">
              Tips based on weather:
            </p>
            <ul className="text-sm text-gray-700 mt-1">
              {weather.temperature > 30 && (
                <li>• Consider watering plants in the evening</li>
              )}
              {weather.temperature < 15 && (
                <li>• Protect sensitive plants from cold</li>
              )}
              {weather.condition.toLowerCase().includes('rain') && (
                <li>• Hold off on watering today</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
