/**
 * bbox type - how to fetch data for map 
 * NO_BBOX - when filter change, get all the points from server
 * SERVER_BBOX - on every zoom / movment of the map get only relevent DEFAULT_BOUNDS
 * LOCAL_BBOX - on zoom/ movment of map get relevent markers from memory (dataAllInjuries)
 */
export enum BBoxType {
    NO_BBOX,
    SERVER_BBOX,
    LOCAL_BBOX
  }