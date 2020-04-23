import IimageEntity from '../stores/ImageEntity';

export const fetchListImgByTag = async (tag: string):
  Promise<Array<any> | undefined> => {
  // Default options are marked with *
  const url = `/api/v1/img/tags/he/${tag}`;
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
export const fetchListImgByPlace = async (place: string):
  Promise<Array<any> | undefined> => {
  // Default options are marked with *
  const url = `/api/v1/img/place/he/${place}`;
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
  // const formData = new FormData();
  // formData.append('blob', new Blob(['Hello World!\n']), 'test');

  const formData = new FormData();
  formData.append('titleh', image.titlehe);
  formData.append('texthe', image.texthe);
  formData.append('image', '');
  // formData.append('tags', image.tags.toString());
  formData.append('place', image.place);

  const url = '/api/v1/img/';
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });
  if (!response.ok) {
    return [];
  }
  return response.json(); // parses JSON response into native JavaScript objects
};


export const updateImgProps = async (image: IimageEntity):
  Promise<Array<any> | undefined> => {
  // Default options are marked with *
  const url = '/api/v1/img/props';
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
  // Default options are marked with *
  const url = `/api/v1/img/${fileName}`;
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
