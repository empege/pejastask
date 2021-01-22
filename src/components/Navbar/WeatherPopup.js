import React from 'react'
import { useGlobalContext } from '../../context';
import WeatherIcon from './WeatherIcon';

const WeatherPopup = () => {

  const { weatherLoading, weatherData, weatherError } = useGlobalContext();

  if (weatherLoading) {
    return (
      <section className="pop-up">
        Loading, Please Wait.
      </section>
    )
  }
  if (weatherError) {
    return (
      <section className="pop-up">
        {`Cannot Fetch Data Right Now :(`}
      </section>
    )
  }
  if (weatherData) {
    const { title } = weatherData;
    const { max_temp, min_temp, weather_state_name: weather, weather_state_abbr: abbr, wind_speed, humidity } = weatherData.consolidated_weather[0];
    const [max, min, windSpeed] = [max_temp.toFixed(2), min_temp.toFixed(2), wind_speed.toFixed(2)]
    return (
      <section className="pop-up">
        <h1><span>Closest City:</span><br /> {title}</h1>
        <h3><span>Max:</span><br /> {max}ºC</h3>
        <h3><span>Min:</span><br /> {min}ºC</h3>
        <h1><span>State:</span><br /> {weather}</h1>
        <WeatherIcon abbr={abbr} />
        <h3><span>Wind Speed:</span><br /> {windSpeed} 💨</h3>
        <h3><span>Humidity:</span><br /> {humidity}% 💧</h3>
      </section>
    )
  }
  return (
    <section className="pop-up">
      Please Allow Geolocation to see the Weather.
    </section>
  )
}

export default WeatherPopup
