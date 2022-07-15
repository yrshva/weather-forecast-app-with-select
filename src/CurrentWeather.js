import React from 'react';
import WeatherIcon from './WeatherIcon';
import "./CurrentWeather.css";


export default function CurrentWeather(props) {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    function currentTime(){
      let now = new Date();
      let dt = new Date((new Date().getTime())+(props.weather.timezone+(now.getTimezoneOffset()*60))*1000)
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
    let temp = Math.round(props.weather.temperature);
    let temp_min = Math.round(props.weather.temp_min);
    let temp_max = Math.round(props.weather.temp_max);
    if(props.units==="imperial"){
      temp = Math.round(temp*1.8+32);
      temp_min = Math.round(temp_min*1.8+32);
      temp_max = Math.round(temp_max*1.8+32);
    }
    
    
    return <div className="weatherTodayWrap">
            <div className="weatherTodayContainer">
              <div className="weatherPositioning">
                <div className="leftBox">
                  <h2>{props.weather.name}</h2>
                  <p>Local time:<br/>{currentTime()}</p>
                </div>
                <div className="centralBox">
                  <div><WeatherIcon icon={props.weather.icon} color={"#a8d3f7"} size={50}/></div>
                </div>
                <div className="rightBox">
                  <h2>
                    <span className="temperature">{temp}</span>
                    <span className="temperature-scale">{unitsMapping[props.units]}</span>
                  </h2>
                  <p>
                    Wind: <span></span>{Math.round(props.weather.wind)} km/h
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
}
