const baseUrl = 'https://nominatim.openstreetmap.org/reverse?';

export default function getCityNameByCoords(lat, lon) {
  return fetch(`${baseUrl}lat=${lat}&lon=${lon}&format=json`, {
    headers: {
      'User-Agent': 'ID of your APP/service/website/etc. v0.1'
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then(res => {
      return res.address.city;
    });
}
