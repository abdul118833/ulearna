import React from "react";

const formatTimestamp = (timestamp) => {
  if (!timestamp) return "N/A";
  try {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  } catch (error) {
    return "Invalid time";
  }
};

const Modal = ({ isOpen, onClose, weatherData }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-xl shadow-lg p-6 w-full max-w-md transform transition-transform duration-500 ease-in-out ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-3xl font-bold text-white transition-transform duration-300 hover:scale-110"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-4xl font-bold mb-4 text-center capitalize">
          {weatherData.city || "City"}
        </h2>
        <img
          src={`http://openweathermap.org/img/wn/${
            weatherData.icon || "01d"
          }@2x.png`}
          alt="Weather icon"
          className="w-28 h-28 mb-4 mx-auto transition-transform duration-300 transform hover:scale-125"
        />
        <div className="text-center mb-4">
          <p className="text-3xl font-semibold">
            {weatherData.temp || "N/A"}°C
          </p>
          <p className="text-lg text-gray-300 capitalize">
            {weatherData.condition || "Condition"}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center text-sm">
          <div>
            <p className="font-semibold">Wind Speed</p>
            <p>{weatherData.wind || "N/A"} km/h</p>
          </div>
          <div>
            <p className="font-semibold">Humidity</p>
            <p>{weatherData.humidity || "N/A"}%</p>
          </div>
          <div>
            <p className="font-semibold">Pressure</p>
            <p>{weatherData.pressure || "N/A"} hPa</p>
          </div>
          <div>
            <p className="font-semibold">Visibility</p>
            <p>
              {weatherData.visibility
                ? (weatherData.visibility / 1000).toFixed(1)
                : "N/A"}{" "}
              km
            </p>
          </div>
          <div>
            <p className="font-semibold">Sunrise</p>
            <p>{formatTimestamp(weatherData.sunrise) || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Sunset</p>
            <p>{formatTimestamp(weatherData.sunset) || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
