import { observable } from 'mobx';
 
export interface IGroupBy2 {
  text: string;
  name: string;
  vals: any;
}

export default class GroupBy2 implements IGroupBy2 {
  @observable
  text: string;

  name: string;

  vals: any;

  constructor(text: string, name: string) {
    this.text = text;
    this.name = name;
    this.vals = {};
  }

  revTrnas = (key: string) => {
    if (key === '') return '';
    const res = this.vals[key].name;
    return res;
  }

  // input sample: {count : [{grp2: "זכר", count: 3},  {grp2: "נקבה", count: 2} ]}
  // output sample: {_id: "2015", male: 3, female: 2}
  fixStrcutTable = (data: any[]) => {
    const res = data.map((x) => {
      const arr = x.count.map((y: any) => {
        const engVal = this.revTrnas(y.grp2);
        return (`"${engVal}":${y.count}`);
      }).join(',');
      // eslint-disable-next-line no-underscore-dangle
      let xId = x._id;
      if (xId !== null && xId !== undefined && typeof (xId) === 'string') xId = xId.replace('"', '\\"');
      let sObject = `{"_id":"${xId}",${arr}}`;
      sObject = JSON.parse(sObject);
      return (sObject);
    });
    return res;
  }

  getBars = () => {
    // [{key:"male",color:"#8884d8"},{key:"female",color:"#82ca9d"}]
    const res = Object.entries(this.vals).map(([key, x]: any[]) => ({ key: x.name, color: x.color }));
    return res;
  }

  getColumns = () => {
    const res = Object.entries(this.vals).map(([key, x]: any[]) => (x.name));
    res.unshift('_id');
    return res;
  }
}
