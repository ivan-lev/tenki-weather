// The weather data is coming from
// https://www.weatherapi.com/

import React from 'react';
import ApiWeather from '../../utils/api-weather.js';
import styles from './app.module.css';
import Credits from '../Credits/Credits.jsx';
import apiUnsplash from '../../utils/api-unsplash.js';

import Main from '../Main/Main.jsx';

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
      ApiWeather.getWeather(currentPosition.latitude, currentPosition.longitude)
        .then(res => {
          setWeatherData(res);
        })
        .catch(error => console.log('Error occured while getting weather: ', error));
    }
  }, [isPositionReceived]);

  React.useEffect(() => {
    if (weatherData) {
      const currentWeather = weatherData.current.condition.text;
      apiUnsplash
        .getPictures('небольшой снег')
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
    <div className={styles.page}>
      <Main weatherData={weatherData} />

      {imageObject && (
        <Credits author={imageObject?.user.name} link={imageObject?.user.links.html} />
      )}
    </div>
  );
}

export default App;
