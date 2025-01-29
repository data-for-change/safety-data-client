export interface Accident {
    _id: number;
    latitude: number;
    longitude: number;
    accident_year: string;
    accident_timestamp: string;
    day_in_week_hebrew: string;
    day_night_hebrew:string;
    injured_type_hebrew:string;
    injury_severity_hebrew:string;
    vehicle_vehicle_type_hebrew:string;
    sex_hebrew:string;
    age_group_hebrew:string;
    population_type_hebrew: string;
    accident_yishuv_name?:string;
    street1_hebrew?:string;
    street2_hebrew?:string;
    road1?:string;
    road2:string;
    road_segment_name?:string;
    road_type_hebrew:string;
    location_accuracy_hebrew?:string;
    accident_type_hebrew:string;
    vehicles: string;
    speed_limit_hebrew?:string;
    multi_lane_hebrew?:string;
    one_lane_hebrew?:string;
    road_width_hebrew?:string;
  }