import { observable } from 'mobx';

export interface ImageEntityLean {
    _id : number;
    filename: string;
    titlehe: string;
    texthe: string;
    tags: string;
    place: string;
  }

export interface IimageEntity extends ImageEntityLean {
    titleen?: string;
    texten?: string;
    titlear?: string;
    textar?: string;
    file?: File
  }

export default class ImageEntity implements IimageEntity {
  constructor(_id:number, filename: string, titlehe: string, texthe: string, tags: string, place:string) {
    this._id = _id;
    this.filename = filename;
    this.titlehe = titlehe;
    this.texthe = texthe;
    this.tags = tags;
    this.place = place;
  }

  _id : number;

  filename: string;

  @observable
  titlehe: string;

  @observable
  texthe: string;

  @observable
  titleen?: string;

  @observable
  texten?: string;

  @observable
  titlear?: string;

  @observable
  textar?: string;

  @observable
  tags: string;

  @observable
  place: string;

  file?: File;
}
