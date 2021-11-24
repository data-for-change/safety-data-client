import { observable, action } from 'mobx';
import { Map } from 'react-leaflet';
import L from 'leaflet';
import logger from '../services/logger';
import RootStore from './RootStore';
// import autorun  from "mobx"

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
// const INIT_BOUNDS = [L.latLng(32.032, 34.739), L.latLng(32.115, 34.949)];
const DEFAULT_BOUNDS = [
  L.latLng(29.50, 34.22), // most possible south-west point
  L.latLng(33.271, 35.946), // most possible north-east point
];

export default class MapStore {
  appInitialized = false

  constructor(rootStore: RootStore) {
    // init app data
    this.rootStore = rootStore;
  }

  rootStore: RootStore;

  mapRef: React.RefObject<Map<any>>|null = null;

  setMapRef = (mapRef: React.RefObject<Map<any>>) => {
    this.mapRef = mapRef;
  }

  @observable
  isReadyToRenderMap = false;

  @observable
  bboxType: BBoxType = BBoxType.LOCAL_BBOX;

  @observable
  mapCenter: L.LatLng = new L.LatLng(32.08, 34.83)

  @action
  updateMapCenter = (center: L.LatLng) => {
    this.mapCenter = center;
  }

  @action
  updateMapCenterByCity = (res: any[]) => {
    if (res !== null && res.length > 0) {
      const city = res[0];
      if (city.lat && city.lon) {
        this.updateMapCenter(new L.LatLng(city.lat, city.lon));
      }
    }
  }

  @observable
  useSetBounds = true;

  // @observable
  // mapBounds: L.LatLngBounds = L.latLngBounds(INIT_BOUNDS);
  // @action
  // updateBounds = (bounds: L.LatLngBounds) => {
  //   //logger.log("updateBounds",bounds)
  //   try {
  //     this.mapBounds = (bounds);
  //   } catch (error) {
  //     logger.error(error)
  //   }
  // }
  // @action
  // initBounds = () => {
  //   this.updateBounds(L.latLngBounds(INIT_BOUNDS))
  // }
  @action
  setBounds = (data: any[], citisArr: string[]) => {
    if (this.isSetBounds) {
      const bunds = this.getBounds(data);
      if (citisArr.length > 0 && citisArr[0] !== '') {
        // //this.mapBounds = bunds;
        // if (bunds.contains(this.mapCenter))
        //   this.mapBounds = bunds;
        // else
        //  logger.log("worng bounds: ", bunds, this.mapCenter)
      } else {
        this.updateMapCenter(bunds.getCenter());
        // this.mapBounds = bunds;
      }
      this.isSetBounds = false;
    }
  }

  @observable
  isSetBounds = false;

  @action
  updateIsSetBounds = (citisArr: string[], roadSegArr: any[]) => {
    if (this.useSetBounds) {
      if (citisArr.length > 0 && citisArr[0] !== '') this.isSetBounds = true;
      else if (roadSegArr.length > 0 && roadSegArr[0] !== '') this.isSetBounds = true;
    }
  }

  @observable
  heatLayerHidden = true;

  @action
  toggleHeatLayer = () => {
    this.heatLayerHidden = !this.heatLayerHidden;
  }
////////// markers /////////////////
  @observable
  useSmallMarkers = false;

  @action
  toggleUseSmallMarkers = () => {
    this.useSmallMarkers = !this.useSmallMarkers;
  }

  @observable
  markerIconsType = "Vehicle";

  @action
  setMarkerIconsType = (value:string) => {
    this.markerIconsType = value;
  }
  markerIconTypesArr = [
    { val: "general", text: 'general' },
    { val: "Vehicle", text: 'Vehicle' },
  ];

  @observable
  markerColorType = "Severity";

  @action
  setMarkerColorType = (value:string) => {
    this.markerColorType = value;
  }
  markerColorTypesArr = [
    { val: "Severity", text: 'Severity' },
    { val: "Vehicle", text: 'Vehicle' },
  ];

////// bounds //////////////////////
  getBounds = (data: any[]) => {
    // logger.log("setBounds!")
    let arr: L.LatLng[] = [];
    let lastPoint: L.LatLng = L.latLng(0, 0);
    data.forEach((x) => {
      if (x.latitude !== null && x.longitude !== null) {
        const p = new L.LatLng(x.latitude, x.longitude);
        if ((lastPoint.lat === 0 && lastPoint.lng === 0)
        || x.latitude !== lastPoint.lat
        || x.longitude !== lastPoint.lng) {
          arr.push(p);
          // prevent insertion of duplicate same point
          lastPoint = p;
        }
      }
    });
    // bounds for single point
    if (arr.length === 1) {
      arr.length = 0; // clean tha array
      arr.push(L.latLng(lastPoint.lat + 0.01, lastPoint.lng + 0.01));
      arr.push(L.latLng(lastPoint.lat - 0.01, lastPoint.lng - 0.01));
    }
    // in case no lat/lon info
    if (arr.length < 2) arr = DEFAULT_BOUNDS;
    const bounds = L.latLngBounds(arr);
    return bounds;
  }

  getBounds2 = (data: any[]) => {
    if (data.length === 0) return L.latLngBounds(DEFAULT_BOUNDS);
    const bounds = {
      south: 200, north: -200, west: 200, east: -200,
    };
    data.forEach((x) => {
      if (x.latitude !== null && x.longitude !== null) {
        bounds.south = Math.min(x.latitude, bounds.south);
        bounds.north = Math.max(x.latitude, bounds.north);
        bounds.west = Math.min(x.longitude, bounds.west);
        bounds.east = Math.max(x.longitude, bounds.east);
      }
    });
    // bounds for single point
    if (bounds.south === bounds.north) {
      bounds.south -= 0.01;
      bounds.north += 0.01;
      bounds.west -= 0.01;
      bounds.east += 0.01;
    }
    const b = L.latLngBounds([bounds.south, bounds.west], [bounds.east, bounds.north]);
    return b;
  }

  @observable
  dataMarkersInBounds: any[] = []

  @action
  updateDataMarkersInBounds = (data: any[]) => {
    this.dataMarkersInBounds = data;
  }

  getMarkersInBBox = () => {
    if (this.bboxType === BBoxType.LOCAL_BBOX) {
      this.getMarkersInLocalBBox(0.02);
    } else if (this.bboxType === BBoxType.SERVER_BBOX) {
      this.submintGetMarkersBBox();
    }
  }

  getMarkersInLocalBBox = (boundsMargin: number) => {
    if (this.mapRef === undefined || this.mapRef === null || this.mapRef.current === null) return;
    try {
      const mapBounds = this.mapRef.current.leafletElement.getBounds();
      const west = mapBounds.getWest() - boundsMargin;
      const east = mapBounds.getEast() + boundsMargin;
      const south = mapBounds.getSouth() - boundsMargin;
      const north = mapBounds.getNorth() + boundsMargin;
      const data = this.rootStore.filterStore.dataAllInjuries
        .filter((x) => x.latitude >= south
          && x.latitude <= north && x.longitude >= west && x.longitude <= east);
      // const zoom = this.mapRef.current.leafletElement.getZoom();
      // console.log(zoom, east -west ,data.length);     
      this.updateDataMarkersInBounds(data);
    } catch (error) {
      logger.error(error);
    }
  }

  submintGetMarkersBBox = () => {
    // if (this.mapRef === undefined || this.mapRef === null || this.mapRef.current === null) return;
    // const mapBounds = this.mapRef.current.leafletElement.getBounds();
    // const filter = this.rootStore.filterStore.getFilterForPost(mapBounds, true);
    // fetchFilter(filter, 'latlon')
    //   .then((data: any[] | undefined) => {
    //     if (data !== null && data !== undefined) {
    //       this.updateDataMarkersInBounds(data);
    //     }
    //   });
  }
}
