class ApiWeather {
  constructor({ url, apiKey }) {
    this._url = url;
    this._apiKey = apiKey;
  }

  getWeather(latitude, longitude) {
    return fetch(`${this._url}key=${this._apiKey}&q=${latitude},${longitude}&lang=ru`, {
      method: 'GET'
    }).then(res => this.checkResponseStatus(res));
  }

  checkResponseStatus(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }
}

const apiWeather = new ApiWeather({
  url: 'http://api.weatherapi.com/v1/current.json?',
  apiKey: 'dc27fcf4584048f181365033232311'
});

export default apiWeather;
