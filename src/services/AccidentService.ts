
import { API_URL, API_URL2 } from '../utils/globalEnvs';
import axios from 'axios';

class AccidentService {
  apiUrl = API_URL || '';

  public fetchGetList = async (filter: string, type: string): Promise<Array<any> | undefined> => {
    const url = `${API_URL2}/involved${filter}`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // equivalent to fetch's credentials: 'same-origin'
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching involved list:', error);
      return [];
    }
  };

  public fetchGetGroupBy = async (filter: string): Promise<Array<any> | undefined> => {
    const url = `${API_URL2}/involved/groupby${filter}`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching groupby data:', error);
      return [];
    }
  };
  
  public getLatestCbsUpdateDate = async () => {
    return axios.get(`${API_URL2}/api/latest-cbs-update-date`);
  };

  //old code - fetch post requests 
  public fetchFilter = async (filter: string, type: string):
    Promise<Array<any> | undefined> => {
    // Default options are marked with *
    const url = `${this.apiUrl}/api/v1/accident/${type}`;
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: filter,
    });
    if (!response.ok) {
      return [];
    }
    return response.json(); // parses JSON response into native JavaScript objects
  };

  public fetchAggregatFilter = async (filter: string, type: string): Promise<Array<any> | undefined> => {
    // Default options are marked with *
    const url = (type === 'main') ? `${this.apiUrl}/api/v1/accident/aggmain` : `${this.apiUrl}/api/v1/accident/agglatlon`;
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: filter,
    });
    if (!response.ok) {
      return [];
    }
    return response.json(); // parses JSON response into native JavaScript objects
  };

  public fetchAggregate = async (filter: string): Promise<Array<any> | undefined> => {

    // Default options are marked with *
    const url = `${this.apiUrl}/api/v1/accident/agg`;
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: filter,
    });
    if (!response.ok) {
      return [];
    }
    return response.json(); // parses JSON response into native JavaScript objects
  };
}
const AccidentServiceInstance = new AccidentService();
export default AccidentServiceInstance;

