export interface ItemCount {
    _id: string;
    count: number;
}

export interface ItemCount2 {
    _id: string;
    count : Array<IGroupCont>
}
export interface IGroupCont {
    grp2: string;
    count : number;
}