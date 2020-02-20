import { observable, action } from "mobx"
import AccidentService from "../services/Accident.Service"
//import autorun  from "mobx"

interface IPassenger {
  checked: boolean;
  filters: string[];
}

class Passenger implements IPassenger {
  @observable
  checked: boolean;
  filters: string[];
  constructor(valid:boolean ,filters: string[]) {
    this.checked = valid;
    this.filters = filters;
  }
}

export enum EnumVehiclePass {
  All,
  Ped,
  Cycle,
  Motorcycle,
  Car,
  Others
  }
export default class FilterStore {
  appInitialized = false
  constructor() {
    // init app data
    this.appInitialized = false;
    this.injTypes.push(new Passenger(true,[]));
    this.injTypes.push(new Passenger(false, ["הולך רגל"]));  
    this.injTypes.push(new Passenger(false, ["נהג - אופניים", "נוסע - אופניים (לא נהג)"]));
    this.injTypes.push(new Passenger(false, ["נהג - אופנוע", "נוסע - אופנוע (לא נהג)"]));
    this.injTypes.push(new Passenger(false, ["נהג - רכב בעל 4 גלגלים ויותר", "נוסע - רכב בעל 4 גלגלים ויותר"]));
    this.injTypes.push(new Passenger(false,["נהג - רכב לא ידוע","נוסע - רכב לא ידוע"]));
  }
  @observable
  startYear: number = 2015;
  @observable
  endYear: number = 2017;
  @observable
  city: string = "";

  //injType
  @observable
  // injTypeAll: boolean = true;
  // @observable
  // injTypePed: boolean = false;
  // @observable
  // injTypeCycle: boolean = false;
  // @observable
  // injTypeMotorcycle: boolean = false;
  // @observable
  // injTypeCar: boolean = false;
  // @observable
  // injTypeOthers: boolean = false;
  // @observable
  injTypes:Array<IPassenger> = [];

  //injType: Map<number, any[]> = new Map<number, any[]>();

  @action
  updateInjuerdType = (aType:number, val :boolean) => {
    if (aType === 0)
    {
      this.injTypes[0].checked = val;
      this.injTypes[1].checked = !val;
      this.injTypes[2].checked = !val;
      this.injTypes[3].checked = !val;
      this.injTypes[4].checked = !val;
      this.injTypes[5].checked = !val;
    }
    else {
      this.injTypes[0].checked = false;
      this.injTypes[aType].checked = val;
    }
  }

  @observable
  markers: any[] = []


  

  @action
  submitFilter = () => {
    let filter = `{"$and" : [`
    filter += `{"accident_year":  { "$gte" : ${this.startYear},"$lte": ${this.endYear}}}`;
    if (this.city !== "") filter += `, {"accident_yishuv_name": "${this.city}"}`;
    filter += this.getfilterInjured();
    filter += `]}`
    console.log(filter)
    var service = new AccidentService();
    service.getFilter(filter, this.updateMarkers);
  }

  getfilterInjured =() =>{
    let filter:string = '';
    if (this.injTypes[0].checked)
      filter = '';
    else {  
      let arrfilter: string[]  =[];
      const iterator = this.injTypes.values();
      for (const injType of iterator) {
        if (injType.checked)
        {
          arrfilter =[...arrfilter,...injType.filters ]  
        }
      }
      filter +=`,{"$or": [`
      filter += arrfilter.map((x:string) => `{"injured_type_hebrew" : "${x}"}`).join(',')
      filter += `]}`
      }
    console.log(filter)
    return filter;
  /*   let res = `, { "$or" : [`
    //replace with map function
    let added = false;
      if (this.injTypePed) { 
        res  += `{"injured_type_hebrew1" : "הולך רגל"}`
        added = true;
      }
      if (this.injTypeCycle) {
        if (added ) res  += `,`
        res  += `{"injured_type_hebrew" : "נהג - אופניים"}`
      }
      res  += `]}`;
    return res; */
  }

  @action
  updateMarkers = (arrPoints: any[]) => {
    if (arrPoints !== null) {
      this.markers = arrPoints;
    }
  }
}

//   @observable
//   todos: Array<ITodo> = [];
//   @observable
//   filter: string = ""
//   @computed
//   get filterdTodos() {
//     let filterP = new RegExp(this.filter, "i");
//     return this.todos.filter((doto: ITodo) => filterP.test(doto.value));
//   }
//   @action
//   createTodo(value: string) {
//     this.todos.push(new Todo(value));
//   }
//   @action
//   clearComleted = () => {
//     let list: Array<ITodo> = this.todos.filter(todo => !todo.complete)
//     this.todos = list;
//   }
// }


// autorun(() =>{
//     console.log(store.todos[0])
//     console.log(store.filter)
// })

//export default store