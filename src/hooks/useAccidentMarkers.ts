import { useState, useEffect } from "react";
import { toJS, autorun } from "mobx";
import { useStore } from "../stores/storeConfig";
import { BBoxType, Accident} from "../types";
import logger from "../services/logger";

export const useAccidentMarkers = () => {
  const { filterStore, mapStore, uiStore } = useStore();
  const { isUse2StepsMarkers, markersLoadStep, dataMarkersLean, dataAllInjuries } = filterStore;
  const { bboxType, dataMarkersInBounds, markerIconsType, markerColorType } = mapStore;

  const [markers, setMarkers] = useState<{ key: string; data: Accident; language: string; colorBy: string; markerIconsType: string }[]>([]);

  // autorun to automatically update markers when observables change
  useEffect(() => {
    const disposer = autorun(() => {
      let reactMarkers;
      if (bboxType !== BBoxType.NO_BBOX) {
        reactMarkers = toJS(dataMarkersInBounds);
      } else if (isUse2StepsMarkers && markersLoadStep === 1) {
        reactMarkers = toJS(dataMarkersLean);
      } else {
        reactMarkers = toJS(dataAllInjuries);
      }

      // Filter and transform markers
      const updatedMarkers = reactMarkers
        .map((x: Accident) => {
          try {
            if (x.latitude !== null && x.longitude !== null) {
              return {
                key: `marker-${x._id}`,
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

      // Update state with new markers
      setMarkers(updatedMarkers);
    });

    // Cleanup disposer when the component is unmounted
    return () => {
      disposer();
    };
  }, [bboxType, dataMarkersInBounds, dataMarkersLean, dataAllInjuries, markersLoadStep, isUse2StepsMarkers, uiStore.language, markerColorType, markerIconsType]);

  return markers;
};
