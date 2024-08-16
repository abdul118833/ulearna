import React from 'react';

const WeatherCard = ({ city, weatherData, isFavorite, toggleFavorite, onClick }) => {
  return (
    <div
      className="relative p-6 m-4 bg-gradient-to-b from-gray-800 to-gray-700 text-white rounded-xl shadow-lg hover:shadow-2xl hover:bg-gradient-to-b hover:from-gray-700/60 hover:to-gray-600/90 transition-transform transform hover:scale-105 cursor-pointer"
      onClick={onClick}  // Open modal or toggle favorite
    >
      <div className="absolute top-2 right-2">
        <button
          className="text-yellow-400 hover:text-yellow-300"
          onClick={(e) => {
            e.stopPropagation();  // Prevent click event from triggering parent click because we are also showing the Details Upon Click
            toggleFavorite(city);
          }}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2 lowercase first-letter:uppercase">
          {city}
        </h2>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
          alt="Weather icon"
          className="w-24 h-24 mb-4 transition-transform transform hover:rotate-12"
        />
        <p className="text-2xl md:text-lg font-semibold mb-1">
          {weatherData.temp}°C
        </p>
        <p className="text-sm text-gray-300 mb-2 capitalize">
          Condition: {weatherData.condition}
        </p>
      </div>
      <div className="flex justify-between mt-4 text-sm">
        <div>
          <p>Wind Speed</p>
          <p className="font-semibold">{weatherData.wind} km/h</p>
        </div>
        <div>
          <p>Humidity</p>
          <p className="font-semibold text-right">{weatherData.humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
