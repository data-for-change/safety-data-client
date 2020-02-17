import { observable, computed, action} from "mobx"
import AccidentService from "../services/Accident.Service"
//import autorun  from "mobx"

interface ITodo {
  value: string;
  id :number;
  complete: boolean;
}

class Todo implements ITodo {
  @observable
  value: string;
  @observable
  id :number;
  @observable
  complete: boolean;
  constructor(value:string){
    this.value = value;
    this.id = Date.now();
    this.complete = false;
  }
}

export default class FilterStore {
    appInitialized = false
    constructor () {
        // init app data
        this.appInitialized =false;
    }
    @observable
    startYear:number = 2015;
    @observable
    endYear:number = 2017;
    @observable
    city:string = "";

    @observable
    markers:any[] = []

    @action
    submitFilter= () => {
     console.log(this.startYear)

     let filter = `{"accident_year":  { "$gte" : ${this.startYear},"$lte": ${this.endYear}}`;
     if (this.city !== "") filter += `, "accident_yishuv_name": "${this.city}"`;
     filter += `}`
     console.log (filter)
     var service = new  AccidentService ();
     service.getFilter(filter,this.updateMarkers);
    }

    @action
    updateMarkers= (arrPoints:any[]) => {
      if(arrPoints !== null)
      {
        this.markers = arrPoints;
      }
    }

    @observable
    todos:Array<ITodo> = [];
    @observable
    filter:string = ""
    @computed
    get filterdTodos(){
      let filterP = new RegExp(this.filter,"i");
      return this.todos.filter((doto:ITodo) => filterP.test(doto.value));
    }
    @action
    createTodo(value:string){
      this.todos.push(new Todo(value));
    }
    @action
    clearComleted = () => {
      let list:Array<ITodo> = this.todos.filter(todo => !todo.complete)
      this.todos = list;
    }
}


// autorun(() =>{
//     console.log(store.todos[0])
//     console.log(store.filter)
// })

//export default store