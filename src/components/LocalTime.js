import React, {useState, useEffect} from 'react';
import { DAYS, MONTHS } from './DateFormat';

export default function LocalTime (props) {
    const date = new Date();
    const localTime= (date.getTime())+(props.timezone+(date.getTimezoneOffset()*60))*1000;
    const [dt, setDt] = useState(new Date(localTime));
    let minutes = dt.getMinutes(), 
    hours = dt.getHours(), 
    seconds = dt.getSeconds();
    function timeFormat (time){
        return (time < 10 ? time =`0${time}` : time)
    }
    useEffect(()=>{
        const interval = setInterval(() => {
        setDt(new Date(localTime));
        }, 10);
        return () => {
            clearInterval(interval);
        };
    },[localTime]);
    return <p>Local time:<br/>{DAYS[dt.getDay()]}, {dt.getDate()} {MONTHS[dt.getMonth()]} {timeFormat(hours)}:{timeFormat(minutes)}:{timeFormat(seconds)}</p>
    
}