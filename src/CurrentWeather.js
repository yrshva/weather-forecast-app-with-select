import React, {useState, useEffect, CSSProperties} from 'react';
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

import WeatherIcon from './WeatherIcon';
import "./CurrentWeather.css";


export default function CurrentWeather(props) {
  const override: CSSProperties = {
    display: "block",
    margin: "auto",
    textAlign: "center"
  };
    let months = ["Jan","Feb","Mar","Apr", "May","Jun","Jul","Aug", "Sep","Oct","Nov","Dec"];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let [weatherData, setWeatherData] = useState(null);
    let [loaded, setLoaded]=useState(false);
    let time = new Date().toLocaleString();
    let [localTime,setLocalTime] = useState(time);
    useEffect(() => {
      setInterval(() => {
      setLocalTime(time);
      }, 1000);
    });
    function showWeatherData(response) {
      setWeatherData(response.data);
    }
    function getWeatherData(){
      const apiKey = "c558530bb05c403b5dd2f204254ec041";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${props.city[0]}&lon=${props.city[1]}&appid=${apiKey}&units=metric`;
      axios.get(apiUrl).then(showWeatherData);
      axios.get(apiUrl).catch((data,status)=>{
        alert("Please enter correct city");
      })
      console.log('pls');
    }
    function currentTime(){
      let now = new Date();
      let dt = new Date((new Date().getTime())+(weatherData.timezone+(now.getTimezoneOffset()*60))*1000)
      let day = days[dt.getDay()];
      let month = months[dt.getMonth()];
      let minutes=dt.getMinutes();
      let houres = dt.getHours();
      if (minutes<10){
        minutes = `0${minutes}`;
      }
      if(houres<10){
        houres = `0${houres}`;
      }
      return (`${day}, ${dt.getDate()} ${month} ${houres}:${minutes}`);  
    }
    const unitsMapping = {
      "imperial": "°F",
      "metric": "°C"
    }
    useEffect(()=>{
          getWeatherData();
      },[props.city])
    useEffect(()=>{
      setTimeout(()=>{
        if(weatherData!=null){
          setLoaded(true);
        }
    },500)},[weatherData])
    
    if(loaded) {
      let temp = Math.round(weatherData.main.temp);
      let temp_min = Math.round(weatherData.main.temp_min);
      let temp_max = Math.round(weatherData.main.temp_max);
      if(props.units==="imperial"){
      temp = Math.round(temp*1.8+32);
      temp_min = Math.round(temp_min*1.8+32);
      temp_max = Math.round(temp_max*1.8+32);
      }
      return <div className="weatherTodayWrap">
            <div className="weatherTodayContainer">
              <div className="weatherPositioning">
                <div className="leftBox">
                  <h2>{weatherData.name}</h2>
                  <p>Local time:<br/>{currentTime()}</p>
                </div>
                <div className="centralBox">
                  <div><WeatherIcon icon={weatherData.weather[0].icon} color={"#a8d3f7"} size={50}/></div>
                </div>
                <div className="rightBox">
                  <h2>
                    <span className="temperature">{temp}</span>
                    <span className="temperature-scale">{unitsMapping[props.units]}</span>
                  </h2>
                  <p>
                    Wind: <span></span>{Math.round(weatherData.wind.speed)} km/h
                    <br />
                    Max: <span className="temperature">{temp_max}</span>
                    <span className="temperature-scale">{unitsMapping[props.units]}</span> | Min:
                    <span className="temperature"> {temp_min}</span>
                    <span className="temperature-scale">{unitsMapping[props.units]}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
  }else {
    return  <BeatLoader color={"#a8d3f7"} loading={true} cssOverride={override} size={15} />
  }
}