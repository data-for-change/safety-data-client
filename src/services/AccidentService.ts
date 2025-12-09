
import { API_URL, API_URL2 } from '../utils/globalEnvs';
import axios from 'axios';

class AccidentService {
  apiUrl = API_URL || '';

  public fetchGetList = async (filter: string, type: string): Promise<any | undefined> => {
    // Default options are marked with *
    let url = `${API_URL2}/involved`;
    //let url = `${this.apiUrl}/api/v1/accident/`;
    url += filter;
    // console.log(url);
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
    });
    if (!response.ok) {
      return [];
    }
    return await response.json(); // parses JSON response into native JavaScript objects
  };
  
  public fetchGetGroupBy = async (filter: string): Promise<Array<any> | undefined> => {
    // Default options are marked with *
    let url = `${API_URL2}/involved/groupby`
    //let url = `${this.apiUrl}/api/v1/accident/groupby/`;
    url += filter;
    // console.log(url);
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
    });
    if (!response.ok) {
      return [];
    }
    return response.json(); // parses JSON response into native JavaScript objects
  };
  
  public getLatestCbsUpdateDate = async () => {
        // Default options are marked with *
        let url = `${API_URL2}/api/latest-cbs-update-date`
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
        });
        if (!response.ok) {
          return null;
        }
        return response.json();
  };
  
  public getLatestCbsUpdateDate1 = async () => {
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

