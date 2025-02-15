import { useState } from "react";
import axios from "axios";

const API_KEY = "7dfc83b25f784955129de12440079692";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const useWeather = (initialCities) => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState(initialCities); // Manage cities in state

  const fetchWeatherForCities = async (citiesArray) => {
    setLoading(true);
    const validCities = [];

    for (const city of citiesArray) {
      try {
        const response = await axios.get(`${API_URL}`, {
          params: {
            q: city,
            units: "metric",
            appid: API_KEY,
          },
        });

        const { temp, humidity, pressure } = response.data.main;
        const wind = response.data.wind.speed;
        const condition = response.data.weather[0].main;
        const icon = response.data.weather[0].icon;
        const visibility = response.data.visibility;
        const { sunrise, sunset } = response.data.sys;

        // Add the city to the weatherData state and the validCities array
        setWeatherData((prevState) => ({
          ...prevState,
          [city]: {
            temp,
            humidity,
            wind,
            condition,
            icon,
            visibility,
            sunrise,
            sunset,
            pressure,
          },
        }));
        validCities.push(city);
      } catch (error) {
        console.error(`Error fetching weather data for ${city}:`, error);
      }
    }

    // Set only the valid cities
    setCities(validCities);
    setLoading(false);
  };

  return {
    weatherData,
    cities,
    loading,
    fetchWeatherForCities,
    setCities, // Expose setCities if needed for resetting or updating
  };
};

export default useWeather;
