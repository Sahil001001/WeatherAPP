import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const {
    name,
    main: { temp, humidity },
    weather: [details],
    wind: { speed },
    sys: { country },
  } = weather;

  return (
    <div className="w-[90%] max-w-[400px] h-[460px] bg-white/5 rounded-2xl shadow-2xl text-white p-6 border border-white/20 mx-auto space-y-5">

      {/* Location */}
      <div className="text-2xl font-semibold text-center">
        📍 {name}, {country}
      </div>

      {/* Weather Type */}
      <div className="text-center text-gray-200 text-lg capitalize italic">
        {details.main} – {details.description}
      </div>

      {/* Icon + Temp */}
      <div className="flex flex-col items-center">
        <img
          src={`http://openweathermap.org/img/wn/${details.icon}@4x.png`}
          alt={details.description}
          className="w-32 h-32"
        />
        <p className="text-6xl font-bold mt-2">{Math.round(temp)}°C</p>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 my-3"></div>

      {/* Humidity + Wind */}
      <div className="flex justify-between px-4 text-md text-gray-300">
        <p>💧 Humidity: <span className="font-semibold text-white">{humidity}%</span></p>
        <p>💨 Wind: <span className="font-semibold text-white">{speed} km/h</span></p>
      </div>
    </div>
  );
};

export default WeatherCard;
