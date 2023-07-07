import React, { useState } from "react";
import WeatherGraph from "./WeatherGraph";
import './Weather.css'

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({})
  const [history, setHistory] = useState([])
  const [toggleHistory, setToggleHistory] = useState(false)

  const submitHandler = async () => {
    setHistory([...history, city])
    // const API_key  = "32a5bb7b9aa1126387e06acad817149e"
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.REACT_APP_API}&units=metric&q=${city}`
    );
   
    if(response.status===200){
        const data = await response.json()
        setWeatherData(data)
    }
  };

  const historyHander = () =>{
    setToggleHistory(!toggleHistory)
  }

const historyDeleteHandler = (city) =>{
  const filterHistory = history.filter(ci=>city!==ci)
  setHistory(filterHistory)
}

  return (
    <div className="weatherContainer">
      <input
      className="cityInput"
      placeholder="City"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={submitHandler}>Submit</button>
      <button onClick={historyHander}>History</button>

      {Object.keys(weatherData).length>0 && <WeatherGraph weatherData={weatherData}/>}

      {toggleHistory && history.map(city=>{
        return <div className="history_list">
          <div key={city}>{city}</div>
          <div className="delete" onClick={()=>historyDeleteHandler(city)}>X</div>
          </div>
      })}

      {toggleHistory && history.length===0 && <div>No history available</div>}
    </div>
  );
};

export default Weather;
