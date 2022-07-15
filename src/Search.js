import React, {useState, useCallback, useMemo, CSSProperties, useEffect } from 'react';
import GridLoader from "react-spinners/GridLoader";
import DatalistInput, {startsWithValueFilter} from 'react-datalist-input';
import axios from "axios";
import cities from "cities.json";
import CurrentWeather from "./CurrentWeather";
import Forecast from './Forecast';
import 'react-datalist-input/dist/styles.css';
import "./Search.css";



export default function Search() {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)"
  };
  let [value, setValue] = useState('');
  let [city, setCity] = useState(null);
  let [units, setUnits] = useState("metric");
  let [loaded, setLoaded] = useState(false);
  let [weatherData, setWeatherData] = useState(null);
  
  function showWeatherData(response) {
    setWeatherData({
      coordinates: response.data.coord,
      name: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      temp_min: response.data.main.temp_min,
      temp_max: response.data.main.temp_max,
      timezone: response.data.timezone,
      icon: response.data.weather[0].icon,
      description: response.data.weather[0].description
    });
    setLoaded(true);
  }
  function getWeatherData(){
    const apiKey = "c558530bb05c403b5dd2f204254ec041";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city[0]}&lon=${city[1]}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeatherData);
    axios.get(apiUrl).catch((data,status)=>{
      alert("Please enter correct city");
    })
  }
  function showCity(response){
    setCity([response.data.lat, response.data.lon]);
  }
  function showCurrentLocation() {
    let apiKey = `RwmHPc7UO6BPu8h9UQkb`;
    let apiUrl = `https://extreme-ip-lookup.com/json/?key=${apiKey}`
    axios.get(apiUrl).then((showCity));
    axios.get(apiUrl).catch((data, status) => {
      console.log("Something went wrong");
    });
  }
  function handleCurrentLocation(event){
    event.preventDefault();
    showCurrentLocation();
  }
  function showFahrenheit (event){
    event.preventDefault();
    setUnits("imperial");
  }
  function showCelsius (event){
    event.preventDefault();
    setUnits("metric");
  }
  useEffect(()=>{
    setTimeout(()=>{
      if(city!=null){
        getWeatherData();
      }else{
        showCurrentLocation();
      }
    },500)   
  }, [city])


  const items = useMemo(
    () =>
      cities.map((city,index) => ({
        id: index,
        value: `${city.name}, ${city.country}`,
        lng: city.lng,
        lat: city.lat
      })),
    [],
  );
  const limitOptionsFilter: Filter = useCallback((items, value) => items.slice(0, 10), []);
  const filters = [startsWithValueFilter,limitOptionsFilter] ;
  if (loaded) {
    return (
    <div>
      <div className="searchBox">
        <div className="scale">
          <a href="/" onClick={showFahrenheit}>°F</a>
          <span> | </span>
          <a href="/" onClick={showCelsius}>°C</a>
        </div>
        <div className='search'>
          <DatalistInput
              value={value}
              setValue={setValue}          
              placeholder="Start entering the city"
              items={items}
              filters={filters}
              onSelect={(item) => {
                setCity([item.lat,item.lng]);
                setValue("");
              }}
            />
            <a href="/" onClick={handleCurrentLocation}>Show current location weather</a>
        </div>
          
      </div>
      <CurrentWeather weather={weatherData} units={units}/>
    </div>
  );
}else{
  return <div style={{width:"100%", height:"100vh"}}>
    <GridLoader color={"#a8d3f7"} loading={true} cssOverride={override} size={30} />
    </div>
}
}
