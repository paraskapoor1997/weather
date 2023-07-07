import React from "react";
import './WeatherGraph.css'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const WeatherGraph = ({ weatherData }) => {
console.log(weatherData.list)
  const options =
    weatherData &&
    weatherData?.list?.slice(0, 9).map((hour) => {
      const hour_split = hour.dt_txt.split(" ");
      const time = parseInt(hour_split[1].split(":")[0]);
      return {
        temp:time,
        hours: hour.main.temp,
      };
    });


  return (
    <div style={{ margin: "30px" }}>
      <div className="temp_details">Selected City - {weatherData?.city?.name}</div>
      <div className="temp_details">Current Temperature - {weatherData?.list[0]?.main?.temp}°C</div>

      <div style={{marginTop:'30px'}}>
      <LineChart width={800} height={300} data={options}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="temp" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="hours" stroke="rgba(75, 192, 192, 1)" />
    </LineChart>
      </div>
     
    </div>
  );
};

export default WeatherGraph;
