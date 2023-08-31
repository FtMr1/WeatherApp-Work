import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [wheater, setWeather] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${
            import.meta.env.VITE_WEATHER_API
          }&q=${location}&days=10&aqi=yes&alerts=yes`
        );
        setWeather(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    if (location) {
      fetchData();
    }
  }, [location]);
  const inputChange = (event) => {
    setLocation(event.target.value);
  };

  return (
   <div className=" bg-gray-300 min-w-full min-h-screen">

  
   <div className=" container mx-auto">
      <div className="flex-col justify-center text-center ">
        <h1 className=" font-bold mb-2 text-3xl">Hava Durumu Uygulaması</h1>
        <div className="mt-36 ">
          <h2 className="font-semibold text-2xl mb-2">Şehir Giriniz</h2>
          <input
            type="text"
            onChange={inputChange}
            className="border w-72 p-2"
          />
        </div>
        {wheater && (
          <div className="grid grid-cols-2 gap-9 mt-20">
            {wheater.forecast.forecastday.map((day) => (
              <div className="shadow-lg p-4 m-2 flex justify-around items-center bg-blue-300">
                  <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                />
                <h2>{day.date}</h2>
              
                <p className=" text-red-600">{day.day.avgtemp_c}</p>
                <p> {day.day.condition.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default App;
