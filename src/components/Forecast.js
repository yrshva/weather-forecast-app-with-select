import React, { useState, useEffect } from "react";
import axios from "axios";
import ForecastDay from "./ForecastDay";
import "../styles/Forecast.css";

export default function Forecast(props) {
  const [forecastData, setForecastData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  function showForecast(response) {
    setForecastData(response.data.daily);
    console.log("updated");
  }
  useEffect(() => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.city[0]}&lon=${props.city[1]}&exclude=current,hourly,minutely,alerts&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
    axios.get(apiUrl).then(showForecast);
    axios.get(apiUrl).catch((data, status) => {
      console.log("Something went wrong");
    });
  }, [props.city]);
  useEffect(() => {
    setTimeout(() => {
      if (forecastData != null) {
        setLoaded(true);
      }
    }, 500);
  }, [forecastData]);
  if (loaded) {
    return (
      <div className="container forecast-wrap">
        <div className="row d-flex justify-content-center">
          {forecastData.map(function (dailyForecast, index) {
            if (index > 0) {
              return (
                <ForecastDay
                  key={index}
                  data={dailyForecast}
                  units={props.units}
                />
              );
            } else return null;
          })}
        </div>
      </div>
    );
  } else return null;
}
