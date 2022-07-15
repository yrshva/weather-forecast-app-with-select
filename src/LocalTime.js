import React, {useState, useEffect} from 'react';

export default function LocalTime(props) {
    let months = ["Jan","Feb","Mar","Apr", "May","Jun","Jul","Aug", "Sep","Oct","Nov","Dec"];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let time = new Date();
    let localTime= (time.getTime())+(props.timezone+(time.getTimezoneOffset()*60))*1000;
    let [dt, setDt] = useState(new Date(localTime))
    let day = days[dt.getDay()];
    let month = months[dt.getMonth()];
    let minutes=dt.getMinutes();
    let houres = dt.getHours();
    let seconds = dt.getSeconds();
    if (minutes<10){
        minutes = `0${minutes}`;
    }
    if(houres<10){
        houres = `0${houres}`;
    }
    if (seconds<10){
        seconds = `0${seconds}`;
    }
    useEffect(()=>{
        const interval = setInterval(() => {
        setDt(new Date(localTime));
        }, 10);
        return () => {
            clearInterval(interval);
        };
    },[localTime]);
    return <p>Local time:<br/>{day}, {dt.getDate()} {month} {houres}:{minutes}:{seconds}</p>
    
}