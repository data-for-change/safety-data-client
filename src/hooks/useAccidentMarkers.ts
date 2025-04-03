import { toJS } from "mobx";
import { LatLngTuple } from "leaflet";
import { useStore } from "../stores/storeConfig";
import { BBoxType, Accident } from "../types";
import { useSelector } from "react-redux";
import { selectDataAllInjuries } from "../stores/casualty/casualtySlice";

export const useAccidentMarkers = () => {
  const { filterStore, mapStore, uiStore } = useStore();
  const { isUse2StepsMarkers, markersLoadStep, dataMarkersLean } = filterStore;
  const { bboxType, dataMarkersInBounds, markerIconsType, markerColorType } = mapStore;
  const dataAllInjuries = useSelector(selectDataAllInjuries);

  let reactMarkers;
  if (bboxType !== BBoxType.NO_BBOX) {
    reactMarkers = toJS(dataMarkersInBounds);
  } else if (isUse2StepsMarkers && markersLoadStep === 1) {
    reactMarkers = toJS(dataMarkersLean);
  } else {
    reactMarkers = toJS(dataAllInjuries);
  }

  return (!Array.isArray(reactMarkers)) ? [] : reactMarkers
    .map((x: Accident) => {
      try {
        const latitude = x.latitude !== null && !isNaN(Number(x.latitude))
          ? parseFloat(Number(x.latitude).toFixed(10))
          : null;
        const longitude = x.longitude !== null && !isNaN(Number(x.longitude))
          ? parseFloat(Number(x.longitude).toFixed(10))
          : null;
        if (latitude !== null && longitude !== null) {
          return {
            key: `marker-${x._id}`,
            position: [latitude, longitude] as LatLngTuple,
            data: x,
            language: uiStore.language,
            colorBy: markerColorType,
            markerIconsType,
          };
        }
        return null;
      } catch (error) {
        console.error(error);
        return null;
      }
    })
    .filter((marker): marker is NonNullable<typeof marker> => marker !== null);
};
