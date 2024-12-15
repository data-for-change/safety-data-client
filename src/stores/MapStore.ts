import { observable, action, makeAutoObservable } from 'mobx';
//import { Map } from 'react-leaflet';
import L from 'leaflet';
import logger from '../services/logger';
import RootStore from './RootStore';
import { setBrowserQueryString, delBrowserQueryString } from '../utils/queryStringUtils';
import { BBoxType } from '../types/BBoxType';
// import autorun  from "mobx"




// const INIT_BOUNDS = [L.latLng(32.032, 34.739), L.latLng(32.115, 34.949)];
const DEFAULT_BOUNDS = [
  L.latLng(29.50, 34.22), // most possible south-west point
  L.latLng(33.271, 35.946), // most possible north-east point
];
const QUERY_STR_NAME_LAT = 'lat';
const QUERY_STR_NAME_LNG = 'lng';
const QUERY_STR_NAME_MRKRCOLOR = 'mkclr';

export interface IMapStore {
  isLoading: boolean;
  setIsLoading: (value:boolean) => void;
  mapCenter: L.LatLng;
  mapZoom: number;
  mapBounds: L.LatLngBounds | null;
  bboxType: BBoxType;
  markerColorType: string;
  markerIconsType: string;   
  heatLayerHidden: boolean;
}

export default class MapStore {
  appInitialized = false

  constructor(rootStore: RootStore) {
    // init app data
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false,
      mapCenter: observable,
      mapZoom: observable,
      bboxType: observable,
      markerColorType: observable,
      markerIconsType: observable,
      heatLayerHidden: observable
   });
  }

  rootStore: RootStore;

  mapRef: React.RefObject<any> | null = null;

  setMapRef = (mapRef: React.RefObject<any>) => {
   
    this.mapRef = mapRef;
  }
  @action
  onMapLoad = () => {
    console.log('onMapLoad');
    const params = new URLSearchParams(window.location.search);
    this.setMapZoomByQuery(params);
  }

  /////////// set / get from quey string
  @action
  setStoreByQuery = (params: URLSearchParams) => {
    this.setMapCenterByQuery(params);
    this.setMapZoomByQuery(params);
    this.setMarkerColorTypeByQuery(params);
  }

  delQueryStrMapCenter = () => {
    delBrowserQueryString(QUERY_STR_NAME_LAT);
    delBrowserQueryString(QUERY_STR_NAME_LNG)
  }

  setQueryStrMapCenter = (center: L.LatLng) => {
    setBrowserQueryString(QUERY_STR_NAME_LAT, center.lat.toFixed(5));
    setBrowserQueryString(QUERY_STR_NAME_LNG, center.lng.toFixed(5));
  }
  setQueryStrMapZoom = (zoom: number) => {
    setBrowserQueryString('z', zoom.toString());
  }

  @observable
  isReadyToRenderMap = false;

  @observable
  bboxType: BBoxType = BBoxType.LOCAL_BBOX;

  @observable
  mapCenter: L.LatLng = new L.LatLng(32.08, 34.83)

  @action
  updateMapCenter = (center: L.LatLng, updateQuery: boolean = true) => {
    this.mapCenter = center;
    if (updateQuery) {
      this.setQueryStrMapCenter(center);
    }
  }

  @observable
  mapZoom: number = 13;

  @action
  setMapZoom = (value: number) => {
    this.mapZoom = value;
  };


  @action
  setMapCenterByQuery = (params: URLSearchParams) => {
    const center = this.getCenterByQuery(params);
    if (center) {
      this.updateMapCenter(center, false);
    }
  }
  getCenterByQuery = (params: URLSearchParams) => {
    let center = null
    const sLat = params.get(QUERY_STR_NAME_LAT);
    const sLon = params.get(QUERY_STR_NAME_LNG);
    if (sLat && sLon) {
      const lat = Number.parseFloat(sLat);
      const lng = Number.parseFloat(sLon)
      if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
        center = new L.LatLng(lat, lng);
      }
    }
    return center;
  }
  @action
  setMapZoomByQuery = (params: URLSearchParams) => {
    const sZoom = params.get('z');
    if (sZoom) {
      const zoom = Number.parseInt(sZoom);
      if (!Number.isNaN(zoom)) {
        this.setMapZoom(zoom);
      }
    }
  }
  // if this is init-page and query string has center- don't center by city location
  isCenterMapByCity = () => {
    let doCenterByCity = true;
    if (this.rootStore.uiStore.initPage) {
      const params = new URLSearchParams(window.location.search);
      const center = this.getCenterByQuery(params);
      if (center) {
        doCenterByCity = false;
      }
    }
    return doCenterByCity;
  }

  @action
  updateMapCenterByCity = (res: any[]) => {
    if (res !== null && res.length > 0) {
      const city = res[0];
      if (city.lat && city.lon) {
        this.updateMapCenter(new L.LatLng(city.lat, city.lon));
        this.setMapZoom(13);
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
      const bunds = this.getBoundsByPointsArr(data);
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
  setMarkerIconsType = (value: string) => {
    this.markerIconsType = value;
  }
  markerIconTypesArr = [
    { val: "general", text: 'general' },
    { val: "Vehicle", text: 'Vehicle' },
  ];

  @observable
  markerColorType = "Severity";

  @action
  setMarkerColorType = (value: string) => {    
    this.markerColorType = value;
    setBrowserQueryString(QUERY_STR_NAME_MRKRCOLOR, value);
  }
  @action
  setMarkerColorTypeByQuery = (params: URLSearchParams) => {
    const val = params.get(QUERY_STR_NAME_MRKRCOLOR);
    if (val !== null) {
      this.setMarkerColorType(val);
    }
  }
  setBrowserQueryStringByMarkerColor = (params: URLSearchParams) => {
    params.set(QUERY_STR_NAME_MRKRCOLOR, (this.markerColorType));
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }

  markerColorTypesArr = [
    { val: "Severity", text: 'Severity' },
    { val: "Vehicle", text: 'Vehicle' },
    { val: 'AccidentType', text: 'AccidentType' },
    { val: 'SelfOrNotAcc', text: 'SelfOrNotAcc' },
    { val: "DayNight", text: 'DayNight' },
    { val: "Gender", text: 'Gender' },
    { val: 'RoadType', text: 'RoadType' }
  ];

  ////// bounds //////////////////////
  getBoundsByPointsArr = (data: any[]) => {
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

  @observable
  mapBounds: L.LatLngBounds | null = null;
  @action
  updateMapBounds = (newBounds: L.LatLngBounds) => {
    try {      
      this.mapBounds = newBounds;
      //get markers
      if (this.bboxType !== BBoxType.NO_BBOX) this.getMarkersInBBox();
      //update query string by map
      this.setQueryStrMapCenterByBounds(newBounds)
    } catch (error) {
      logger.error(error);
    }
  };
  setQueryStrMapCenterByBounds = (mapBounds: L.LatLngBounds) => {   
    //if (this.mapRef === undefined || this.mapRef === null || this.mapRef.current === null) return;
    try {
      // const mapBounds = this.mapRef.current.leafletElement.getBounds();
      if (mapBounds) {
        const center = mapBounds.getCenter()
        this.setQueryStrMapCenter(center);
        //this.setQueryStrMapZoom(this.mapRef.current.leafletElement.getZoom());
      }
    } catch (error) {
      logger.error(error);
    }
  }
  /* 
    setMapZoom =(zoom: number) =>{
      console.log('mapRef',this.mapRef)
      if (this.mapRef === undefined || this.mapRef === null || this.mapRef.current === null) return;
      try {
        this.mapRef.current.leafletElement.setZoom(zoom);
        const zoom2 = this.mapRef.current.leafletElement.getZoom();
        console.log('zoom2', zoom2)
      } catch (error) {
        logger.error(error);
      }
    } */

  getMarkersInBBox = () => {
    if (this.bboxType === BBoxType.LOCAL_BBOX) {
      this.getMarkersInLocalBBox(0.02);
    } else if (this.bboxType === BBoxType.SERVER_BBOX) {
      this.submintGetMarkersBBox();
    }
  }

  getMarkersInLocalBBox = (boundsMargin: number) => {
    //if (this.mapRef === undefined || this.mapRef === null || this.mapRef.current === null) return;
    try {
      const mapBounds = this.mapBounds;
      if(mapBounds !== null){
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
      }   
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
