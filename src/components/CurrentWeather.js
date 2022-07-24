import React, {useState, useEffect} from 'react';
import axios from "axios";
import LocalTime from './LocalTime';
import BeatLoader from "react-spinners/BeatLoader";
import WeatherIcon from './WeatherIcon';
import "../styles/CurrentWeather.css";

const override = {
  display: "block",
  margin: "auto",
  textAlign: "center"
};
const unitsMapping = {
  "imperial": "°F",
  "metric": "°C"
}
export default function  CurrentWeather (props) {
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded]=useState(false);
    
    function showWeatherData(response) {
      setWeatherData(response.data);
    }
    
    useEffect(()=>{
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${props.city[0]}&lon=${props.city[1]}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
      axios.get(apiUrl).then(showWeatherData);
      axios.get(apiUrl).catch((data,status)=>{
        alert("Please enter correct city");
      });
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
                  <LocalTime timezone={weatherData.timezone}/>
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