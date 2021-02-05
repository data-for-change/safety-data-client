export default class AccidentService {
  // get request using jsonp

}

export const fetchFilter = async (filter: string, type: string):
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

export const fetchAggregatFilter = async (filter: string, type: string): Promise<Array<any> | undefined> => {
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

export const fetchAggregate = async (filter: string): Promise<Array<any> | undefined> => {
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
