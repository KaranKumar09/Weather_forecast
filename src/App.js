import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);



  const handleOnSearchChange = (searchData) => {
    //console.log(searchData);
    const [lat, long] = searchData.value.split(" ")

    /*
      COULD DO THIS to grab data of API
      const currentWeatherFetch=fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`);
      OR..

      use api.js to import the link
    */

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`);

    // Now for Forecast
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });

      })
      .catch((err) => console.log(err));

  }

  console.log(currentWeather);
  console.log(forecast);
  /*If the widget does not exist dont show that  -below arrow-   so if we are in component we dont have any error*/
  return (
    <div className="container">
      <Search OnSearchChange={handleOnSearchChange} />      
      
      {currentWeather && <CurrentWeather data={currentWeather} />}
   
      {forecast && <Forecast data={forecast}/>}
   
    </div>

  );
}

export default App;
