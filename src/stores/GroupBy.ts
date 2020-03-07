import { observable} from "mobx"

export interface IGroupBy {
    text: string;
    value: string;
    limit: number;
  }
  
  export default class GroupBy implements IGroupBy {
    @observable
    text: string;
    value: string;
    limit: number;
    constructor(text: string, value: string, limit: number=0) {
        this.text = text;
        this.value = value;
        this.limit = limit;
    }
  }