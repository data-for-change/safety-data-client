import { observable, action } from 'mobx';
import RootStore from './RootStore';
import {
  fetchListImgByTag, fetchListImgByPlace, updateImgProps, uploadImg,
} from '../services/ImageService';
import IimageEntity from './ImageEntity';

export default class ImageStore {
  appInitialized = false

  constructor(rootStore: RootStore) {
    // init app data
    this.rootStore = rootStore;
  }

  rootStore: RootStore;

  @observable
  imageList: IimageEntity[] = [];

  @action
  setImageList = (data: IimageEntity[]) => {
    this.imageList = data;
    if (this.imageList.length > 0) this.setCurrImage(this.imageList[0]);
  }

  @observable
  isLoading: boolean = false;

  @observable
  currImage: IimageEntity| null = null;

  @action
  setCurrImage = (image: IimageEntity) => {
    this.currImage = image;
  }

  @observable
  hideDescription = false;

  @action
  toggleHideDescription = () => {
    this.hideDescription = !this.hideDescription;
    if (this.hideDescription) {
      document.documentElement.style.setProperty('--image-gallery-description-visable', 'none');
    } else document.documentElement.style.setProperty('--image-gallery-description-visable', 'inherit');
  }

  setCurrImageVal= <T extends keyof IimageEntity, K extends IimageEntity[T]> (valName: T, val: K) => {
    if (this.currImage !== null) this.currImage[valName] = val;
  }

  submitImageFile = () => {
    if (this.currImage !== null) {
      // console.log(tags);
      if (this.currImage._id === 0 && this.currImage.file !== undefined) {
        uploadImg(this.currImage);
      } else updateImgProps(this.currImage);
    }
  };

  getImages = (type :string) => {
    if (type === 'city') {
      const city = this.rootStore.filterStore.cityResult;
      this.getImagesByPlace(city);
    } else { this.getImagesByTag('הולכי רגל'); }
  }

  getImagesByTag = (tag :string) => {
    this.isLoading = true;
    fetchListImgByTag(tag)
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.setImageList(data);
        }
        this.isLoading = false;
      });
  }

  getImagesByPlace = (place :string) => {
    // this.isLoading = true;
    fetchListImgByPlace(place)
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.setImageList(data);
        }
        // this.isLoading = false;
      });
  }
}
