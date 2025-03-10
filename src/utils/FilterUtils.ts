import citiesNamesHeb from '../assets/json/cities_names_heb.json';
import { CityKeyVal } from '../types';

export const getFilterGroupBy =
  (filterMatch: string,
    groupName: string,
    popMin = -1,
    popMax = -1,
    groupName2: string = '',
    limit: number= 0,
    sort: number =0 ) => {
    let filter = filterMatch;
    filter += `&gb=${groupName}`;
    if (groupName2 !== '') {
      filter +=`&gb2=${groupName2}`
    }
    //ignore this until anyway server support 
    // if (sort !== 0)
    // filter +=`&sort=${sort}`
    // if (limit !== 0)
    //   filter +=`&lim=${limit}`
    return filter;
  };

// get filter by city population 
export const getFilterByCityPop = (popMin: number, popMax: number) => {
  let filter = '';
  if (popMin >= 0 && popMax > popMin) {
    //&p1=200000&p2=500000
    filter += `&p1=${popMin}&p2=${popMax}`;
  }
  return filter;
};

/**
 * fiter by accidents per 100,000 city population
 * @param filterMatch 
 * @param popMin 
 * @param popMax 
 * @param sort 
 * @param limit 
 */
export const getFilterGroupByPop = (filterMatch: string, popMin = 200000, popMax = 100000, sort: number, limit: number) => {
  let filter = `${'['
    + '{"$match": '}${filterMatch}}`;
  filter += ',{"$lookup":{'
    + ' "from": "cities", "localField": "accident_yishuv_name",'
    + ' "foreignField": "name_he","as": "city"'
    + '}}';
  if (popMin >= 0 && popMax > 0) {
    filter += `,{ "$match": { "city.population": { "$gte" : ${popMin} , "$lte" : ${popMax}}}}`;
  }
  filter += ',{"$group": {'
    + '"_id": "$accident_yishuv_name","t_count" : { "$sum" : 1 },"t_population" : { "$first" : "$city.population" }'
    + '}}';
  filter += ',{ "$unwind" : "$t_population"}';
  filter += ',{ "$project" : { "count" :'
    + '{ "$multiply" : [100000, { "$divide" : ["$t_count", "$t_population"] } ]}'
    + '}}';
  if (limit === 0) filter += `,{"$sort": {"count": ${sort}}}`;
  else {
    filter += `${`,{"$sort": {"count": ${sort}}}`
      + ',{"$limit": '}${limit}}`;
  }
  filter += ']';
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