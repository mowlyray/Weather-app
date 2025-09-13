import React, { useEffect, useRef, useState } from 'react';
import './Weather.css'
import searchicon from '../assets/search.png'
import clearicon from '../assets/clear.png'
import cloudicon from '../assets/cloud.png'
import drizzleicon from '../assets/drizzle.png'
import rainicon from '../assets/rain.png'
import snowicon from '../assets/snow.png'
import windicon from '../assets/wind.png'
import humidityicon from '../assets/humidity.png'

const Weather = () => {

    const [weatherData, setWeatherData] = useState(false);
    const inputRef = useRef()

   const allIcons = {
     "01d": clearicon,
"01n": clearicon,
"02d": cloudicon,
"02n": cloudicon,
"03d": cloudicon,
"03n": cloudicon,
"04d": cloudicon,
"04n": cloudicon,
"09d": rainicon,
"09n": rainicon,
"10d": drizzleicon,
"10n": drizzleicon,
"11d": rainicon,
"11n": rainicon,
"13d": snowicon,
"13n": snowicon,
};

    const search = async (city)=>{
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try {
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: allIcons[data.weather[0].icon] || clearicon,
            }
            )
        } catch(error){
            setWeatherData(false);
            console.error("Error infetching weather data");
        }
    }

    useEffect(()=>{
        search("Bangladesh")
    },[]);



    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type='text' placeholder='Search'/>
                <img src={searchicon} alt='' onClick={()=>search(inputRef.current.value)}/>
            </div>

           

                    <img src={weatherData.icon} className='weather-icon' alt='' />
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>

            <div className="weather-data">
                <div className="col">
                    <img src={humidityicon} alt='' />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>

                <div className="col">
                    <img src={windicon} alt='' />
                    <div>
                        <p>{weatherData.windSpeed} km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        


        </div>
    );
};

export default Weather;