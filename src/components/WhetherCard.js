import React from 'react';

const WeatherCard = ({ city, weatherData }) => {
  return (
    <div className="p-6 m-4 bg-gradient-to-b from-gray-800 to-gray-700 text-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-b hover:from-gray-700/60 hover:to-gray-600/90">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2 lowercase first-letter:uppercase">{city}</h2>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
          alt="Weather icon"
          className="w-24 h-24 mb-4 transition-transform transform hover:rotate-12"
        />
        <p className="text-2xl md:text-lg font-semibold mb-1">{weatherData.temp}°C</p>
        <p className="text-sm text-gray-300 mb-2 capitalize">
          Condition {weatherData.condition}
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
