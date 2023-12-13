import React from 'react';
import './Main.scss';

const Main = ({ placeName, weatherData }) => {
  const weatherIcon = `https:${weatherData?.current?.condition?.icon}`;

  return (
    <section className="main">
      <p>{placeName}</p>
      <h2 className="main__header">Погода в твоей местности:</h2>
      {weatherData && (
        <p className="main__text">
          На улице:&nbsp;{weatherData?.current.condition.text.toLowerCase()}&nbsp;
          <img className="main__weather-icon" src={weatherIcon} alt="Weather icon"></img>
        </p>
      )}
      <p className="main__text">Температура: {weatherData?.current?.temp_c}&deg;C</p>
      <p className="main__text">Ощущается как: {weatherData?.current?.feelslike_c}&deg;C</p>
      <p className="main__text">Влажность: {weatherData?.current?.humidity}&#37;</p>
    </section>
  );
};

export default Main;
