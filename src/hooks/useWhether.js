import { useState } from 'react';
import axios from 'axios';

const useWeather = (initialCities) => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState(initialCities); // Manage cities in state

  const fetchWeatherForCities = async (citiesArray) => {
    setLoading(true);
    const validCities = [];

    for (const city of citiesArray) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_WEATHER_API_URL}`,
          {
            params: {
              q: city,
              units: "metric",
              appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
            },
          }
        );

        const { temp, humidity } = response.data.main;
        const wind = response.data.wind.speed;
        const condition = response.data.weather[0].main;
        const icon = response.data.weather[0].icon;

        // Add the city to the weatherData state and the validCities array
        setWeatherData((prevState) => ({
          ...prevState,
          [city]: { temp, humidity, wind, condition, icon },
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
