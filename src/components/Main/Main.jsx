import React from 'react';
import styles from './Main.module.scss';

const Main = ({ weatherData }) => {
  const weatherIcon = `https:${weatherData?.current?.condition?.icon}`;

  return (
    <section className={styles.main}>
      <h2 className={styles.main__header}>Погода в твоей местности:</h2>
      {weatherData && (
        <p className={styles.main__text}>
          На улице:&nbsp;{weatherData?.current.condition.text.toLowerCase()}&nbsp;
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
