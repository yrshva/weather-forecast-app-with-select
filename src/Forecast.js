import React, {useState, useEffect, CSSProperties} from 'react';
import axios from 'axios';
import ForecastDay from "./ForecastDay"

import "./Forecast.css";
export default function Forecast(props) {
  let [forecastData,setForecastData]=useState(null);
  let [loaded, setLoaded]=useState(false);
  function showForecast(response){
    setForecastData(response.data.daily);
  }
  function getForecast(){
    let apiKey = "c558530bb05c403b5dd2f204254ec041"
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${props.city[0]}&lon=${props.city[1]}&exclude=current,hourly,minutely,alerts&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(showForecast);
    axios.get(apiUrl).catch((data, status) => {
      console.log("Something went wrong");
    });
  }
  useEffect(()=>{
    getForecast();
  },[props.city])
  useEffect(()=>{
  setTimeout(()=>{
    if(forecastData!=null){
      setLoaded(true);
    }
  },500)},[forecastData])
  if(loaded){
    return <div className="container">
          <div className="row d-flex justify-content-center">
            {forecastData.map(function (dailyForecast,index){
              if(index>0){
                return <ForecastDay key={index} data={dailyForecast} units={props.units}/>
              }else return null;
            })}
        </div>
      </div>
  }else return null;
}

  

