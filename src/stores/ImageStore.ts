import { observable, action } from 'mobx';
import RootStore from './RootStore';
import { fetchListImgByTag, fetchListImgByPlace } from '../services/ImageService';
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
  }

  getImages = (type :string) => {
    if (type === 'city') {
      const city = this.rootStore.filterStore.cityResult;
      this.getImagesByPlace(city);
    } else { this.getImagesByTag('הולכי רגל'); }
  }

  getImagesByTag = (tag :string) => {
    // this.isLoading = true;
    fetchListImgByTag(tag)
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.setImageList(data);
        }
        // this.isLoading = false;
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
