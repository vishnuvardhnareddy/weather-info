import React, { useState } from 'react';
import './App.css';
import clearIcon from './assets/clear.webp';
import cloudIcon from './assets/cloudly.png';
import drizzleIcon from './assets/drizzle.avif';
import humidityIcon from './assets/humidity.webp';
import rainIcon from './assets/rainly.avif';
import snowIcon from './assets/snow.gif';
import sunnyIcon from './assets/sunny.jpg';
import windIcon from './assets/wind.jpg';

function Weather() {
    const [celcius, setCelcius] = useState(0);
    const [vishnuImg, setVishnuImg] = useState(windIcon);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const api_key = "6503f9581dabcfeb2e19f7270a973dae";

    const search = async () => {
        const cityInput = document.querySelector('.cityInput').value;
        if (!cityInput) {
            setError('Please enter a city name');
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${api_key}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setWeatherData(data);
            const celciusValue = kelvinToCelsius(data.main.temp);
            const img = findRelatedImg(celciusValue);
            setCelcius(celciusValue);
            setVishnuImg(img);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const findRelatedImg = (celsius) => {
        if (celsius >= 25) {
            return sunnyIcon;
        } else if (celsius >= 15 && celsius < 25) {
            return clearIcon;
        } else if (celsius >= 5 && celsius < 15) {
            return cloudIcon;
        } else if (celsius >= 0 && celsius < 5) {
            return drizzleIcon;
        } else if (celsius >= -10 && celsius < 0) {
            return rainIcon;
        } else if (celsius >= -20 && celsius < -10) {
            return snowIcon;
        } else {
            return windIcon;
        }
    };

    const kelvinToCelsius = (temp) => {
        return (temp - 273.15).toFixed(1); // Convert Kelvin to Celsius and round to one decimal place
    };

    return (
        <div className='container'>
            <h1 className='head'>FIND WEATHER</h1>
            <div className="top-bar">
                <input type="text" className='cityInput' placeholder='Enter city' />
                <div className="search-icon" onClick={search}>
                    Search
                </div>
            </div>
            {error && <div className="error">{error}</div>}
            {weatherData && (
                <>
                    <div className="weather-image">
                        <img src={vishnuImg} alt="Weather Icon" />
                    </div>
                    <div className="weather-temp">{celcius} °C</div>
                    <div className="weather-location">{weatherData.name}</div>
                    <div className="data-container">
                        <div className="element">
                            <img src={humidityIcon} alt="Humidity Icon" className="icon" />
                            <div className="data">
                                <div className="humidity-percent">{weatherData.main.humidity}%</div>
                                <div className="text">Humidity</div>
                            </div>
                        </div>
                        <div className="element">
                            <img src={windIcon} alt="Wind Icon" className="icon" />
                            <div className="data">
                                <div className="wind-rate">{weatherData.wind.speed} m/s</div>
                                <div className="text">Wind speed</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Weather;
