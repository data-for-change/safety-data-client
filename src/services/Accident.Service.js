import $ from "jquery";

///////
export default class AccidentService {
  //get request using jsonp
  getAll(collback){
    //"http://localhost:5000/api/v1/accident-ped"
    var settings = {
      "url": "/api/v1/accident",
      "method": "GET",
      "headers": {}
    }
    $.ajax(settings).done(function (response) {
      //console.log(response)
      collback(response);
    });
  }
  
}

