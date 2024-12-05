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
  currTag: string = 'כללי';

  @action
  setCurrTag = (tag: string) => {
    this.currTag = tag;
    const lang = this.rootStore.uiStore.language;
    this.getImagesByTag(tag, lang);
  }
  tagsArr = [
    { val: "כללי", text: 'general' },
    { val: "הולכי רגל", text: 'pedestrian' },
    { val: "רוכבי אופניים", text: 'cyclist' },
    { val: "רוכבי אופנוע", text: 'motorcycle' },
    { val: "מכוניות", text: 'car' },
    { val: "אוטובוסים", text: 'bus' },
    { val: "ילדים", text: 'kids' },
  ];

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
      if (this.currImage._id === 0 && this.currImage.file !== undefined) {
        uploadImg(this.currImage);
      } else updateImgProps(this.currImage);
    }
  };

  getImages = (type :string) => {
    const lang = this.rootStore.uiStore.language;
    if (type === 'city') {
      const city = this.rootStore.filterStore.cityResult;
      this.getImagesByPlace(city, lang);
    } else {
      this.getImagesByTag(this.currTag, lang);
    }
  }

  getImagesByTag = (tag :string, lang: string) => {
    this.isLoading = true;
    fetchListImgByTag(tag, lang)
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.setImageList(data);
        }
        this.isLoading = false;
      });
  }

  getImagesByPlace = (place :string, lang: string) => {
    // this.isLoading = true;
    fetchListImgByPlace(place, lang)
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.setImageList(data);
        }
        // this.isLoading = false;
      });
  }
}
