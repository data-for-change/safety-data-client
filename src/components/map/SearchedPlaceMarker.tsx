import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { CircleMarker, Tooltip } from 'react-leaflet';
import { store } from '../../stores/storeConfig';

/// marks the place found by MapSearch
const SearchedPlaceMarker: FC = observer(() => {
  const { searchedPlace } = store.mapStore;
  if (!searchedPlace) return null;
  return (
    <CircleMarker
      center={[searchedPlace.lat, searchedPlace.lng]}
      radius={9}
      pathOptions={{ color: '#fff', weight: 2, fillColor: '#1a73e8', fillOpacity: 1 }}
    >
      <Tooltip permanent direction='top'>{searchedPlace.label}</Tooltip>
    </CircleMarker>
  );
});

export default SearchedPlaceMarker;
