import React, { useEffect, useState } from "react";
import WeatherCard from "@/components/WhetherCard";
import useWeather from "@/hooks/useWhether";
import { initialCities } from "@/constants";
import Searchbar from "@/components/Searchbar";
import Loader from "@/components/Loader";

const WeatherDashboard = () => {
  const { weatherData, cities, loading, fetchWeatherForCities, setCities } =
    useWeather(initialCities); // Use the custom hook

  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search for a single city
  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await fetchWeatherForCities([searchQuery.trim()]);
      setSearchQuery(""); // Clear the input after searching
    }
  };

  // Function to fetch data for default cities
  const fetchDefaultCities = async () => {
    await fetchWeatherForCities(initialCities);
  };

  // Function for resetting to default
  const handleReset = () => {
    setCities(initialCities); // Reset cities to initial list
    setSearchQuery(""); // Clear the search input after searching
    fetchDefaultCities();
  };

  // Search bar component props
  const searchBarProps = {
    searchQuery,
    setSearchQuery,
    handleReset,
    handleSearch,
    loading,
  };

  // Hooks for calling default cities weather data
  useEffect(() => {
    fetchDefaultCities();
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] overflow-auto">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center my-8 text-white">
          Weather Dashboard
        </h1>
        <Searchbar {...searchBarProps} />
        {loading ? (
          <Loader />
        ) : cities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {cities.map((city) => (
              <WeatherCard
                key={city}
                city={city}
                weatherData={weatherData[city] || {}}
              />
            ))}
          </div>
        ) : (
          <p className="text-center font-bold text-white">No Data Found</p>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
