import React from 'react';
import styles from './Main.module.scss';
import weatherConditions from '../../vendor/weather_conditions.json';

const Main = ({ weatherData }) => {
  //console.log(weatherConditions);

  //const weatherIcon = `../../src/images/icons/day/${weatherData?.current?.condition?.code}.png`;
  const weatherIcon = `../../src/images/icons/day/113.png`;

  return (
    <section className={styles.main}>
      <h2 className={styles.main__header}>Погода в твоей местности:</h2>
      {weatherData && (
        <p className={styles.main__text}>
          На улице:&nbsp;{weatherData?.current.condition.text.toLowerCase()}
          <img className={styles['main__weather-icon']} src={weatherIcon} alt="Weather icon"></img>
        </p>
      )}
      <p className={styles.main__text}>Температура: {weatherData?.current?.temp_c}&deg;C</p>
      <p className={styles.main__text}>Ощущается как: {weatherData?.current?.feelslike_c}&deg;C</p>
      <p className={styles.main__text}>Влажность: {weatherData?.current?.humidity}&#37;</p>
    </section>
  );
};

export default Main;
