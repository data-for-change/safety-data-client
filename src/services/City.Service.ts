import $ from "jquery";

///////
export default class CityService {
  //get request using jsonp
  getCityByNameHe(cityName:string,collback :(res:any[]) =>void ){
    //"http://localhost:5000/api/v1/city?name_he=חיפה"
    var settings = {
      "url": "/api/v1/city?name_he=" +cityName,
      "method": "GET",
      "headers": {}
    }
    $.ajax(settings).done(function (response:any[]) {
      //console.log(response)
      collback(response);
    });
  }
}

