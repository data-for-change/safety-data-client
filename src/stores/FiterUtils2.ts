
import { IColumnFilter } from './ColumnFilter';

export const getFilterGroupBy =
  (filterMatch: string,
    groupName: string,
    popMin = -1,
    popMax = -1,
    groupName2: string = '',
    limit: number = 0) => {
    let filter = filterMatch;
    filter += `&gb=${groupName}`;
    if (groupName2 !== '') {
      filter +=`&gb2=${groupName2}`
    }
    if (limit !== 0)
      filter +=`&lim=${limit}`
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

/**
 * return sentence foe query-string from Multiplefilter of booleans,
 * for example : &injt=4,5 
 * @param colFilter column filter with name and chekcd list of values
 */
export const getMultiplefilter = (colFilter: IColumnFilter) => {
  let filter: string = '';
  let allChecked: boolean = true;
  let arrfilter: string[] = [];
  if (colFilter.allTypesOption > -1 && colFilter.arrTypes[colFilter.allTypesOption].checked) allChecked = true;
  else {
    // in case there is allTypesOption , it want be copied to arrfilter
    // as it is not checked
    const iterator = colFilter.arrTypes.values();
    for (const filterCheck of iterator) {
      if (filterCheck.checked) {
        arrfilter = [...arrfilter, ...filterCheck.filters];
      } else {
        allChecked = false;
      }
    }
  }
  if (allChecked) filter = '';
  else {
    filter += `&${colFilter.dbColName}=`;
    filter += arrfilter.join(',');
  }
  return filter;
};

export const getFilterFromArray = (filterName: string, valArr : string[]) => {
  let filter: string = '';
  if (valArr.length > 0 && valArr[0] !== '') {
     filter += `&${filterName}=`;
     filter += valArr.map((x: string) => `"${x.trim()}"`).join(',');
  }
  return filter;
}

export const getfilterBounds = (mapBounds: L.LatLngBounds) => {
  let filter = `&lat=${mapBounds.getSouth()},${mapBounds.getNorth()}`;
  filter += `&lon=${mapBounds.getWest()},${mapBounds.getEast()}`;
  return filter;
}
// don't use this - for post filter
export const getFilterStreets = (streets : string[]) => {
  let filter: string = '';
  if (streets.length > 0 && streets[0] !== '') {
     filter += ',{"$or": [';
     filter += streets.map((x: string) => `{"street1_hebrew" : "${x.trim()}"}`).join(',');
     filter += ',';
     filter += streets.map((x: string) => `{"street2_hebrew" : "${x.trim()}"}`).join(',');
     filter += ']}';
  }
  return filter;
}
// don't use this - for post filter
export const getfilterCity = (cities : string[]) => {
  let filter: string = '';
  if (cities.length > 0) {
     filter += ',{"$or": [';
     filter += cities.map((x: string) => `{"accident_yishuv_name" : "${x}"}`).join(',');
     filter += ']}';
  }
  return filter;
}