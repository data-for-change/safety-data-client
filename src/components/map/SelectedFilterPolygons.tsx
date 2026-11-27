import React from 'react';
import { observer } from 'mobx-react';
import { Polygon } from 'react-leaflet';
import { useStore } from '../../stores/storeConfig';

/** Draws the area filter polygons currently selected in the location filter. */
const SelectedFilterPolygons = observer(() => {
  const { filterStore } = useStore();
  const polygons = filterStore.locationStore.geoFilter?.geo.polygons ?? [];

  return <>
    {polygons.map((polygon, index) => (
      <Polygon
        key={`area-filter-${index}`}
        positions={polygon.coordinates.map(([longitude, latitude]) => [latitude, longitude] as [number, number])}
        pathOptions={{
          color: '#d32f2f',
          weight: 2,
          fillColor: '#ef5350',
          fillOpacity: 0.15,
        }}
      />
    ))}
  </>;
});

export default SelectedFilterPolygons;
