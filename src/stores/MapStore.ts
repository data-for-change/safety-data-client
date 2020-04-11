import { observable, action } from "mobx"
import L from 'leaflet'
import RootStore from "./RootStore";
import { fetchFilter } from "../services/Accident.Service"
//import autorun  from "mobx"

export enum BBoxType {
  NO_BBOX,
  SERVER_BBOX,
  LOCAL_BBOX
}

export default class MapStore {
  appInitialized = false
  constructor(rootStore: RootStore) {
    // init app data
    this.rootStore = rootStore;
  }
  rootStore: RootStore;

  @observable
  isReadyToRenderMap: boolean = false;
  @observable
  bboxType: BBoxType = BBoxType.LOCAL_BBOX;

  @observable
  mapCenter: L.LatLng = new L.LatLng(32.08, 34.83)
  @action
  updateMapCenter = (res: any[]) => {
    if (res !== null && res.length > 0) {
      let city = res[0];
      if (city.lat !== null && city.lon !== null)
        this.mapCenter = new L.LatLng(city.lat, city.lon);
    }
  }
  @observable
  useSetBounds: boolean = true;
  @observable
  mapBounds: L.LatLngBounds = L.latLngBounds(INIT_BOUNDS);
  @action 
  updateBounds = (bounds: L.LatLngBounds) => {
    this.mapBounds = (bounds);
  }
  @action
  initBounds = () => {
    this.updateBounds(L.latLngBounds(INIT_BOUNDS))
  }
  @action
  setBounds = (data: any[], citisArr: string[]) => {
    if (this.isSetBounds) {
      const bunds = this.getBounds(data);
      if (citisArr.length > 0 && citisArr[0] !== "") {
        // //this.mapBounds = bunds;
        // if (bunds.contains(this.mapCenter))
        //   this.mapBounds = bunds;
        // else
        //  console.log("worng bounds: ", bunds, this.mapCenter)
      }
      else
        this.mapBounds = bunds;
      this.isSetBounds = false;
    }
  }

  @observable
  isSetBounds: boolean = false;
  @action
  updateIsSetBounds = (citisArr: string[], roadSegArr: any[]) => {
    if (this.useSetBounds) {
      if (citisArr.length > 0 && citisArr[0] !== "")
        this.isSetBounds = true;
      else if (roadSegArr.length > 0 && roadSegArr[0] !== "")
        this.isSetBounds = true;
    }
  }

  @observable
  heatLayerHidden: boolean = true;
  @action
  toggleHeatLayer = () => {
    this.heatLayerHidden = !this.heatLayerHidden;
  }

  getBounds = (data: any[]) => {
    console.log("setBounds!")
    let arr: L.LatLng[] = [];
    let lastPoint: L.LatLng = L.latLng(0, 0);
    data.forEach(x => {
      if (x.latitude !== null && x.longitude !== null) {
        let p = new L.LatLng(x.latitude, x.longitude);
        if ((lastPoint.lat === 0 && lastPoint.lng === 0) || x.latitude !== lastPoint.lat || x.longitude !== lastPoint.lng) {
          arr.push(p)
          //prevent insertion of duplicate same point
          lastPoint = p;
        }
      }
    });
    //bounds for single point
    if (arr.length === 1) {
      arr.length = 0; //clean tha array
      arr.push(L.latLng(lastPoint.lat + 0.01, lastPoint.lng + 0.01))
      arr.push(L.latLng(lastPoint.lat - 0.01, lastPoint.lng - 0.01))
    }
    //in case no lat/lon info 
    if (arr.length < 2)
      arr = DEFAULT_BOUNDS;
    const bounds = L.latLngBounds(arr)
    return bounds;
  }

  @observable
  dataMarkersInBounds: any[] = []
  @action
  updateDataMarkersInBounds = (data: any[]) => {
    this.dataMarkersInBounds = data;
  }
  getMarkersInBBox = (mapBounds: L.LatLngBounds) => {
    if (this.bboxType === BBoxType.LOCAL_BBOX)
    {
      this.getMarkersInLocalBBox(mapBounds);
    }
    else if(this.bboxType === BBoxType.SERVER_BBOX)
      this.submintGetMarkersBBox(mapBounds);
  }
  getMarkersInLocalBBox = (mapBounds: L.LatLngBounds) => {
    const west = mapBounds.getWest();
    const east = mapBounds.getEast();
    const south = mapBounds.getSouth();
    const north = mapBounds.getNorth();
    const data = this.rootStore.filterStore.dataAllInjuries.filter(x => 
       x.latitude >= south && x.latitude <= north && x.longitude >= west && x.longitude <=  east
      );
    this.updateDataMarkersInBounds(data);
  }
  
  submintGetMarkersBBox = (mapBounds: L.LatLngBounds) => {
    let filter = this.rootStore.filterStore.getFilter(mapBounds, true)
    fetchFilter(filter, 'latlon')
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.updateDataMarkersInBounds(data);
        }
      })
  }
}

const INIT_BOUNDS = [L.latLng(32.032, 34.739), L.latLng(32.115, 34.949)];
const DEFAULT_BOUNDS = [
  L.latLng(29.50, 34.22),     // most possible south-west point
  L.latLng(33.271, 35.946),   // most possible north-east point
];

