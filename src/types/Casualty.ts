export interface CasualtyLean {
    _id : number;
    latitude:number;
    longitude:number;
    injury_severity_hebrew: string;
  }

export default interface Casualty extends CasualtyLean {

};
