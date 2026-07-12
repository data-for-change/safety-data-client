import { PolygonsList, PolygonShape } from "../types";
import policeStations from "../assets/json/police_stations_tlv.json";

export async function loadAreaPolygon(
  areaName: string
): Promise<PolygonsList> {

  const feature = policeStations.features.find(
    (f: any) => f.properties?.shemezor === areaName
  );

  if (!feature) {
    return { polygons: [] };
  }

  const geometry = feature.geometry;

  switch (geometry.type) {
    case "Polygon":
      return {
        polygons: [
          {
            coordinates: geometry.coordinates[0] as [number, number][],
          },
        ],
      };

    default:
      return { polygons: [] };
  }
}