// import * as $ from 'jquery';
// /////
export default class AccidentService {
  // get request using jsonp

}
// export const getAll = (collback: (arrPoints: any[]) => void) => {
//   //"http://localhost:5000/api/v1/accident"
//   var settings = {
//     "url": "/api/v1/accident",
//     "method": "GET",
//     "headers": {}
//   }
//   $.ajax(settings).done(function (response: any) {
//     //console.log(response)
//     collback(response);
//   });
// }

// //send request using jsonp and post body - return arry of points
// export const postGroupby = (filter: string, collback: (arrPoints: any[]) => void) => {
//   //"http://localhost:5000/api/v1/accident/agg"
//   var settings = {
//     "url": "/api/v1/accident/agg",
//     "method": "POST",
//     "headers": {
//       "content-type": "application/json"
//     },
//     "processData": false,
//     "data": filter
//   }
//   $.ajax(settings).done(function (response: any[]) {
//     collback(response);
//   });
// }
// //send request using jsonp and post body - return arry of points
// export const postFilter = (filter: string, collback: (arrPoints: any[]) => void) => {
//   //"http://localhost:5000/api/v1/accident"
//   var settings = {
//     "url": "/api/v1/accident",
//     "method": "POST",
//     "headers": {
//       "content-type": "application/json"
//     },
//     "processData": false,
//     "data": filter
//   }

//   $.ajax(settings).done(function (response: any[]) {
//     collback(response);
//   });
// }
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


export const fetchGroupBy = async (filter: string): Promise<Array<any> | undefined> => {
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
