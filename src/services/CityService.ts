import {API_URL2} from '../utils/globalEnvs';

export default class CityService {
  apiUrl = API_URL2 || '';

  async getCityByid(cityId: string): Promise<any[]> {
    try {
      const url = `${this.apiUrl}/city?yishuv_symbol=${cityId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("srv.getCityByid", error);
      return [];
    }
  }

  getCitiesNames(lang: string, collback: (res: any[]) => void) {
    // "http://localhost:5000/api/v1/city?lang=he"
    const url = `${this.apiUrl}/city`;
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
