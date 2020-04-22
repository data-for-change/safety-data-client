export interface ImageEntityLean {
    _id : number;
    filename: string;
    titlehe: string;
    texthe: string;
    tags: string|string[];
    place: string;
  }

export interface IimageEntity extends ImageEntityLean {

  }

export default class ImageEntity implements IimageEntity {
  constructor(_id:number, filename: string, titlehe: string, texthe: string, tags: string|string[], place:string) {
    this._id = _id;
    this.filename = filename;
    this.titlehe = titlehe;
    this.texthe = texthe;
    this.tags = tags; 
    this.place = place;
  }

  _id : number;

  filename: string;

  titlehe: string;

  texthe: string;

  tags: string|string[];

  place: string;
}
