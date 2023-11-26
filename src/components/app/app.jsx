// The weather data is coming from
// https://www.weatherapi.com/

import styles from './app.module.css';

import React, { useState, useEffect } from 'react';

import apiWeather from '../../utils/api-weather.js';
import apiUnsplash from '../../utils/api-unsplash.js';

import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import Credits from '../Credits/Credits.jsx';

function App() {
  const [weatherData, setWeatherData] = useState('');
  const [currentPosition, setCurrentPosition] = useState({});
  const [isPositionReceived, setIsPositionReceived] = useState(false);
  const [imageObject, setImageObject] = useState(null);
  const [backImage, setBackImage] = useState('');

  // asking browser to give coordinates
  useEffect(() => {
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

  // if coordinates received getting weather data
  useEffect(() => {
    if (isPositionReceived) {
      apiWeather
        .getWeather(currentPosition.latitude, currentPosition.longitude)
        .then(res => {
          setWeatherData(res);
        })
        .catch(error => console.log('Error occured while getting weather: ', error));
    }
  }, [isPositionReceived]);

  // when weather data received getting an object with image data for the background
  useEffect(() => {
    if (weatherData) {
      const currentWeather = weatherData.current.condition.text;
      apiUnsplash
        .getPictures(currentWeather)
        .then(response => setImageObject(response.results[Math.floor(Math.random() * 10)]))
        .catch(error => console.log('Error getting images from Unsplash: ', error));
    }
  }, [weatherData]);

  // when getting the image object, set it to const which used as background
  useEffect(() => {
    if (imageObject) {
      setBackImage(imageObject.urls.regular);
    }
  }, [imageObject]);

  return (
    <div className={styles.page} style={{ backgroundImage: `url(${backImage})`, margin: 0 }}>
      <Main weatherData={weatherData} />
      <Footer>
        {imageObject && (
          <Credits author={imageObject?.user.name} link={imageObject?.user.links.html} />
        )}
      </Footer>
    </div>
  );
}

export default App;
