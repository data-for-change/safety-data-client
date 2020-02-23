import * as $ from 'jquery';
 
///////
export default class AccidentService {
  //get request using jsonp
  getAll(collback:(arrPoints: any[]) => void){
    //"http://localhost:5000/api/v1/accident"
    var settings = {
      "url": "/api/v1/accident",
      "method": "GET",
      "headers": {}
    }
    $.ajax(settings).done(function (response:any) {
      //console.log(response)
      collback(response);
    });
  }
    //get request using jsonp and post body
    getFilter(filter:string,collback:(arrPoints: any[]) => void ){
      //"http://localhost:5000/api/v1/accident"
      var settings = {
        "url": "/api/v1/accident",
        "method": "POST",
        "headers": {
          "content-type": "application/json"
        },
        "processData": false,
        "data": filter
      }
      
      $.ajax(settings).done(function (response:any[]) {
        collback(response);
      });
    }
}

