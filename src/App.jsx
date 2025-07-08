import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// Use your OpenWeatherMap API key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data)

      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found");
        setWeather(null);
      }
    } catch (err) {
      console.error("Failed to fetch weather", err);
    }
  };

  const reset = () => {
    setCity("");
   
  };

  // 🎞️ Return video path based on weather
  const getBackgroundVideo = (weather) => {
    if (!weather) return "/default.mp4";
    const condition = weather.weather[0].main.toLowerCase();
    // console.log(weather.weather[0].main);

    switch (condition) {
      case "clear":
        return "/clear.mp4";
      case "rain":
        return "/rain.mp4";
      case "clouds":
        return "/cloud.mp4";
      case "snow":
        return "/snow.mp4";
      default:
        return "/default.mp4";
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden font-sans">

      {/* 🌄 Dynamic Background Video */}
      <video
        key={getBackgroundVideo(weather)} // 🔁 This forces React to reload the video on weather change
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={getBackgroundVideo(weather)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔲 Glass Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-white/5 z-10"></div>

      {/* 🌤️ App Content */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-white px-4 text-center">

        <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
          Weather App ⛅
        </h1>

        {/* 🔍 Search and Reset Inputs */}
        <div className="bg-white/10  border border-white/20 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-3 shadow-xl w-full max-w-md mb-8">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2 rounded-md bg-white/70 text-black w-full sm:w-64 outline-none focus:ring-2 focus:ring-white transition-all"
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={getWeather}
              className="flex-1 px-4 py-2 border border-black text-white hover:bg-white/20 rounded-md font-medium transition-all"
            >
              Search
            </button>
            <button
              onClick={reset}
              className="flex-1 px-4 py-2 border border-black text-white hover:bg-white/20 rounded-md font-medium transition-all"
            >
              Reset
            </button>
          </div>
        </div>

        {/* 🌦️ Weather Info */}
        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}

export default App;
