import IimageEntity from '../stores/image/ImageEntity';
import {API_URL} from '../utils/globalEnvs';

export const fetchListImgByTag = async (tag: string, lang: string):
  Promise<Array<any> | undefined> => {
  const apiUrl = API_URL || '';
  // Default options are marked with *
  const url = (lang === '') ? `${apiUrl}/api/v1/img/tags/${tag}` : `${apiUrl}/api/v1/img/tags/${lang}/${tag}`;
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
export const fetchListImgByPlace = async (place: string, lang: string):
  Promise<Array<any> | undefined> => {
    const apiUrl = API_URL || '';  
    // Default options are marked with *
    const url = `${apiUrl}/api/v1/img/place/${lang}/${place}`;
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

export const uploadImg = async (image: IimageEntity):
  Promise<Array<any> | undefined> => {
  const apiUrl = API_URL || '';  
  if (image.file === undefined) return [];
  const formData = new FormData();
  formData.append('titlehe', image.titlehe);
  formData.append('texthe', image.texthe);
  formData.append('image', image.file);
  formData.append('tags', image.tags);
  formData.append('place', image.place);
  if (image.index !== undefined) formData.append('index', image.index?.toString());
  const url = `${apiUrl}/api/v1/img/`;
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: formData,
  });
  if (!response.ok) {
    return [];
  }
  return response.json(); // parses JSON response into native JavaScript objects
};

export const updateImgProps = async (image: IimageEntity):
  Promise<Array<any> | undefined> => {
    const apiUrl = API_URL || '';  
    // Default options are marked with *
    const url = `${apiUrl}/api/v1/img/props`;
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(image),
    });
  if (!response.ok) {
    return [];
  }
  return response.json(); // parses JSON response into native JavaScript objects
};

export const fetchImg = async (fileName: string):
  Promise<any| undefined> => {
    const apiUrl = API_URL || '';  
    // Default options are marked with *
    const url = `${apiUrl}/api/v1/img/${fileName}`;
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
    return response; // parses JSON response into native JavaScript objects
};

export default fetchImg;
