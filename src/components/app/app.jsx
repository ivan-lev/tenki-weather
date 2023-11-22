// The weather data is coming from
// https://home.openweathermap.org/

import React from 'react';
import api from '../../utils/api.js';
import styles from './app.module.css';
import Credits from '../credits/credits';
import apiUnsplash from '../../utils/api-unsplash.js';

import sunriseIcon from '../../images/icons/sunrise.png';

function App() {
  const [weatherData, setWeatherData] = React.useState('');
  const [currentPosition, setCurrentPosition] = React.useState({});
  const [isPositionReceived, setIsPositionReceived] = React.useState(false);
  const [imageObject, setImageObject] = React.useState(null);

  React.useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurrentPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setIsPositionReceived(true);
      });
    } else {
      console.log('Geolocation is not available');
    }
  }, []);

  React.useEffect(() => {
    if (isPositionReceived) {
      api
        .getWeatherWithLocation(currentPosition.latitude, currentPosition.longitude)
        .then(res => setWeatherData(res))
        .catch(error => console.log('Error occured while getting Geoposition: ', error));
    }
  }, [currentPosition]);

  React.useEffect(() => {
    if (weatherData) {
      const currentWeather = weatherData.weather[0].main;
      apiUnsplash
        .getPictures(currentWeather)
        .then(response => setImageObject(response.results[Math.floor(Math.random() * 10)]))
        .catch(error => console.log('Error getting images from Unsplash: ', error));
    }
  }, [weatherData]);

  React.useEffect(() => {
    if (imageObject) {
      document.body.style.backgroundImage = `url(${imageObject.urls.regular})`;
    }
  }, [imageObject]);

  return (
    <>
      <section className={styles.app}>
        <h2>Погода в твоей местности:</h2>
        {weatherData && <p>На улице&nbsp;{weatherData?.weather[0]?.description}</p>}
        <p>Температура: {weatherData?.main?.temp}&deg;C</p>
        <p>Ощущается как: {weatherData?.main?.feels_like}&deg;C</p>
        <p>Влажность: {weatherData?.main?.humidity}&#37;</p>
        <p>
          {/* <img src={sunriseIcon} /> <img src="./../../images/icons/sunrise.png" />
          <img src="../../images/icons/sunset.png" /> */}
        </p>
      </section>
      <section>
        {imageObject && (
          <Credits author={imageObject?.user.name} link={imageObject?.user.links.html} />
        )}
      </section>
    </>
  );
}

export default App;
