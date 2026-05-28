import { LatLngExpression } from "leaflet";

export const createFlowerPositions = (
  center: LatLngExpression,
  count: number
): LatLngExpression[] => {
  const radius = 0.0005;

  return Array.from({ length: count }, (_, i) => {
    const angle = (2 * Math.PI * i) / count;

    const latOffset = radius * Math.sin(angle);
    const lngOffset = radius * Math.cos(angle);

    return [
      (center as [number, number])[0] + latOffset,
      (center as [number, number])[1] + lngOffset,
    ];
  });
};