import $ from "jquery";

///////
export default class CityService {
  //get request using jsonp
  getCityByNameHe(cityName,collback){
    //"http://localhost:5000/api/v1/city?name_he=חיפה"
    var settings = {
      "url": "/api/v1/city?name_he=" +cityName,
      "method": "GET",
      "headers": {}
    }
    $.ajax(settings).done(function (response) {
      //console.log(response)
      collback(response);
    });
  }
}

