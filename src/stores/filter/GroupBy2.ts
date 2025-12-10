import { observable } from 'mobx';
import { ItemCount2 } from '../../types';
 
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

  lookupName= (key: string | null | undefined): string => {
    if (!key) return 'unknown';
    return this.vals[key]?.name ?? 'unknown'; 
  };

  // input sample: {count : [{grp2: "זכר", count: 3},  {grp2: "נקבה", count: 2} ]}
  // output sample: {_id: "2015", male: 3, female: 2}
  normalizeGroupedCounts = (data: ItemCount2[]) => {
    return data.map((x) => {
      const obj: Record<string, any> = {};  
      // set _id
      let xId = x._id;
      if (typeof xId === 'string') {
        xId = xId.replace(/"/g, '\\"');
      }
      obj['_id'] = xId;  
      // set counts
      (x.count || []).forEach((y: any) => {
        const engVal = this.lookupName(y.grp2);
        obj[engVal] = y.count;
      });
  
      return obj;
    });
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
