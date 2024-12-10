import {API_URL} from '../utils/globalEnvs';

export default class CityService {
  apiUrl = API_URL || '';
  getCityByNameHe = (cityName: string, collback: (res: any[]) => void) => {
    // "http://localhost:5000/api/v1/city?name_he=חיפה"
    const url = `${this.apiUrl}/api/v1/city?name_he=${cityName}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
    })
      .then(
        response => {
          return response.json();}
        )
      .then(data => {
        collback(data);
      })
      .catch((error) => {
        console.log('srv.getCityByNameHe',error)
      });
      ;
  };

  getCitiesNames(lang: string, collback: (res: any[]) => void) {
    // "http://localhost:5000/api/v1/city?lang=he"
    const url = `${this.apiUrl}/api/v1/city?lang=${lang}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
    })
      .then(response => response.json())
      .then(data => {
        collback(data);
      });
  }
}
