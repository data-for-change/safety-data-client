import { observable, action } from 'mobx';
import RootStore from './RootStore';
import { fetchListImgProps } from '../services/ImageService';

export default class ImageStore {
  appInitialized = false

  constructor(rootStore: RootStore) {
    // init app data
    this.rootStore = rootStore;
  }

  rootStore: RootStore;

  @observable
  imagesData: any[] = [];

  @action
  updateAllInjuries = (data: any[]) => {
    this.imagesData = data;
  }

  submintGetImages = (tag :string) => {
    // this.isLoading = true;
    fetchListImgProps(tag)
      .then((data: any[] | undefined) => {
        if (data !== null && data !== undefined) {
          this.updateAllInjuries(data);
        }
        // this.isLoading = false;
      });
  }
}
