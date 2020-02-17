import $ from "jquery";

///////
export default class AccidentService {
  //get request using jsonp
  getAll(collback){
    //"http://localhost:5000/api/v1/accident"
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
    //get request using jsonp and post body
    getFilter(){
      //"http://localhost:5000/api/v1/accident"
      var settings = {
        "url": "/api/v1/accident",
        "method": "POST",
        "headers": {
          "content-type": "application/json"
        },
        "processData": false,
        "data": "{\"accident_year\":  { \"$gt\" : 2016} , \"accident_yishuv_name\": \"חיפה\"}"
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    }
}

