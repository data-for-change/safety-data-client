export interface PolygonShape {
  coordinates: [number, number][];
}
export interface PolygonsList  {
 polygons: PolygonShape[];
}
export interface GeoFilter {
  geo: PolygonsList;
}