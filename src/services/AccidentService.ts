class AccidentService {
  public fetchGetList = async (filter: string, type: string): Promise<Array<any> | undefined> => {
    // Default options are marked with *
    let url = '/api/v1/accident/';
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
  
  public fetchGetGroupBy = async (filter: string): Promise<Array<any> | undefined> => {
    // Default options are marked with *
    let url = '/api/v1/accident/groupby/';
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
  
  public fetchGetCount = async (filter: string, type: string): Promise<Array<any> | undefined> => {
    // Default options are marked with *
    let url = '/api/v1/accident/get';
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

  public fetchFilter = async (filter: string, type: string):
  Promise<Array<any> | undefined> => {
  // Default options are marked with *
  const url = `/api/v1/accident/${type}`;
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
  const url = (type === 'main') ? '/api/v1/accident/aggmain' : '/api/v1/accident/agglatlon';
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
  const url = '/api/v1/accident/agg';
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
export default new AccidentService();

