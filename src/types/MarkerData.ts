import { LatLngExpression } from "leaflet";
import { Accident } from "./Accident";

export type MarkerData ={
    key: string; 
    data: Accident; 
    position: LatLngExpression, 
    language: string; 
    colorBy: string; 
    markerIconsType: string 
  }