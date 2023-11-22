class ApiUnsplash {
  constructor({ url, accessKey }) {
    this._url = url;
    this._accessKey = accessKey;
  }

  getPictures(query) {
    return fetch(`${this._url}?client_id=${this._accessKey}&per_page=10&query=${query}`, {
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
const apiUnsplash = new ApiUnsplash({
  url: `https://api.unsplash.com/search/photos`,
  accessKey: 'cLdjs2shhFSNIH3rNYbo00Y-Fk9Tk22AVYKo7OYb1Rk'
});

export default apiUnsplash;
