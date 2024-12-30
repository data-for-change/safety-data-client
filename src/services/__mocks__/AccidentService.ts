class AccidentService {
    accidents = [
        {
          "_id": "601d1aa05a1cb4384aad4741",
          "injury_severity_hebrew": "הרוג",
          "injured_type_hebrew": "הולך רגל",
          "age_group_hebrew": "00-04",
          "sex_hebrew": "נקבה",
          "population_type_hebrew": "יהודים",
          "vehicles": "מכונית",
          "accident_year": 2018,
          "accident_timestamp": "2018-03-18 17:00",
          "day_in_week_hebrew": "ראשון",
          "day_night_hebrew": "יום",
          "accident_yishuv_name": "טבריה",
          "street1_hebrew": "רח 503",
          "street2_hebrew": "",
          "location_accuracy_hebrew": "מרכז דרך",
          "road1": "",
          "road2": "",
          "road_segment_name": "",
          "latitude": "32.7817417883528",
          "longitude": "35.5189580435081",
          "accident_type_hebrew": "פגיעה בהולך רגל",
          "vehicle_vehicle_type_hebrew": "",
          "road_type_hebrew": "עירונית לא בצומת",
          "one_lane_hebrew": "דו סיטרי אין קו הפרדה רצוף",
          "multi_lane_hebrew": "",
          "road_width_hebrew": "7 עד 10.5 מטר",
          "speed_limit_hebrew": "עד 50 קמ\"ש"
        },
        {
          "_id": "601d1aa05a1cb4384aad48d4",
          "injury_severity_hebrew": "הרוג",
          "injured_type_hebrew": "הולך רגל",
          "age_group_hebrew": "75-79",
          "sex_hebrew": "זכר",
          "population_type_hebrew": "יהודים",
          "vehicles": "טנדר",
          "accident_year": 2019,
          "accident_timestamp": "2019-02-13 08:30",
          "day_in_week_hebrew": "רביעי",
          "day_night_hebrew": "יום",
          "accident_yishuv_name": "טבריה",
          "street1_hebrew": "דהאן שמעון",
          "street2_hebrew": "",
          "location_accuracy_hebrew": "מרכז דרך",
          "road1": "",
          "road2": "",
          "road_segment_name": "",
          "latitude": "32.7974904313776",
          "longitude": "35.5275863235273",
          "accident_type_hebrew": "פגיעה בהולך רגל",
          "vehicle_vehicle_type_hebrew": "",
          "road_type_hebrew": "עירונית בצומת",
          "one_lane_hebrew": "דו סיטרי אין קו הפרדה רצוף",
          "multi_lane_hebrew": "",
          "road_width_hebrew": "7 עד 10.5 מטר",
          "speed_limit_hebrew": "עד 50 קמ\"ש"
        }
      ]
      
    public fetchGetList = async (filter: string, type: string): Promise<Array<any> | undefined> => {
        return new Promise((resolve) => {
            console.log("Called mocked fetchGetList");
            process.nextTick(() => resolve(this.accidents)); //Resolving the promise with the mocked list
          });
      };
  }
  
  const accidentServiceInstance = new AccidentService();
  export default accidentServiceInstance;