
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
    if (sort !== 0)
    filter +=`&sort=${sort}`
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

export const getfilterBounds = (mapBounds: L.LatLngBounds) => {
  let filter = `&lat=${mapBounds.getSouth()},${mapBounds.getNorth()}`;
  filter += `&lon=${mapBounds.getWest()},${mapBounds.getEast()}`;
  return filter;
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