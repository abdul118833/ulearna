import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import Searchbar from "@/components/Searchbar";
import WeatherCard from "@/components/WhetherCard";
import { initialCities } from "@/constants";
import useWeather from "@/hooks/useWhether";
import React, { useEffect, useState } from "react";

const WeatherDashboard = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const { weatherData, cities, loading, fetchWeatherForCities, setCities } =
    useWeather(initialCities);

  const toggleFavorite = (city) => {
    const updatedFavorites = { ...favorites };

    if (updatedFavorites[city]) {
      delete updatedFavorites[city];
    } else {
      updatedFavorites[city] = weatherData[city];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await fetchWeatherForCities([searchQuery.trim()]);
      setSearchQuery("");
    }
  };

  const fetchDefaultCities = async () => {
    await fetchWeatherForCities(initialCities);
  };

  const handleReset = () => {
    setCities(initialCities);
    setSearchQuery("");
    fetchDefaultCities();
  };

  const openModal = (city) => {
    setModalData(weatherData[city]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const favoriteCities = Object.keys(favorites).map((city) => ({
    city,
    data: favorites[city],
  }));

  const otherCities = cities
    .filter((city) => !favorites[city])
    .map((city) => ({
      city,
      data: weatherData[city] || {},
    }));

  useEffect(() => {
    fetchDefaultCities();
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const searchBarProps = {
    searchQuery,
    setSearchQuery,
    handleReset,
    handleSearch,
    loading,
  };

  return (
    <div className="w-[100vw] h-[100vh] overflow-auto">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center my-8 text-white">
          Weather Dashboard
        </h1>
        <Searchbar {...searchBarProps} />

        {favoriteCities.length > 0 && (
          <p className="mx-4 text-2xl font-bold text-white">Favorites</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {favoriteCities.map(({ city, data }) => (
            <WeatherCard
              key={city}
              city={city}
              weatherData={data}
              isFavorite={!!favorites[city]}
              toggleFavorite={toggleFavorite}
              onClick={() => openModal(city)} // Open modal on click
            />
          ))}
        </div>

        <p className="mx-4 text-2xl font-bold text-white">All Cities</p>

        {loading ? (
          <Loader />
        ) : otherCities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {otherCities.map(({ city, data }) => (
              <WeatherCard
                key={city}
                city={city}
                weatherData={data}
                isFavorite={!!favorites[city]}
                toggleFavorite={toggleFavorite}
                onClick={() => openModal(city)} // Open modal on click
              />
            ))}
          </div>
        ) : (
          <p className="text-center font-bold text-white mt-4">No Data Found</p>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          weatherData={modalData}
        />
      </div>
    </div>
  );
};

export default WeatherDashboard;
