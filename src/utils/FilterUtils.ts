import citiesNamesHeb from '../assets/json/cities_names_heb.json';
import { CityKeyVal } from '../types';

export const createFilterQureyByGroup =
  (filterMatch: string,
    groupName: string,
    popMin = -1,
    popMax = -1,
    groupName2: string = '',
    limit: number= 0,
    sort: string|null =null ) => {
    let filter = filterMatch;
    filter += `&gb=${groupName}`;
    if (groupName2 !== '') {
      filter +=`&gb2=${groupName2}`
    }
    //set group by sort and limit
    if (sort !== null)
    filter +=`&sort=${sort}`
    if (limit !== 0)
      filter +=`&lim=${limit}`
    return filter;
  };

// get filter by city population 
export const createFilterQureyByCityPop = (popMin: number, popMax: number) => {
  let filter = '';
  if (popMin >= 0 && popMax > popMin) {
    //&pmin=200000&pmax=500000
    filter += `&pmin=${popMin}&pmax=${popMax}`;
  }
  return filter;
};



export const getfilterBounds = (mapBounds: L.LatLngBounds) => {
  let filter = `&lat=${mapBounds.getSouth()},${mapBounds.getNorth()}`;
  filter += `&lon=${mapBounds.getWest()},${mapBounds.getEast()}`;
  return filter;
}

// return array of citis names
export const getCitiesNames = (values: string[]): string[] => {
  // Convert input values to numbers
  const numericValues = values.map(Number).filter(v => !isNaN(v));
  return citiesNamesHeb
      .filter((city: CityKeyVal) => numericValues.includes(city.value)) // Filter by number
      .map((city) => city.label); // Return only labels
}

// don't use this - for post filter
export const getFilterStreets = (streets : string[]) => {
  let filter: string = '';
  return filter;
}
// don't use this - for post filter
export const getfilterCity = (cities : string[]) => {
  let filter: string = '';
  return filter;
}

 /**
    * convert parital array of years and count to full array
    * if year is missing, add year and count = 0
    * @param data array of years and counts, some of the years might be missing
    */
 export const padDataYearsWith0 = (data: any, startYear: string | number, endYear:string | number) => {
  const yearsList = [];
  for (let i = Number(startYear); i <= Number(endYear); i += 1) {
     yearsList.push(i);
  }
  const data2 = yearsList.map((year) => {
     const objDAta = data.find((x: any) => x._id === year);
     const val = (objDAta) ? objDAta.count : 0;
     return { _id: year, count: val };
  });
  return data2;
}