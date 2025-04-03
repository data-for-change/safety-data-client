import FilterStore from './filter/FilterStore';
//import UiStore from './ui/UiStore';
import MapStore from './map/MapStore';
import ImageStore from './image/ImageStore';
import IRecommendationStore from './recommendation/RecommendationStore';
import RecommendationStore from './recommendation/RecommendationStore';
import UserStore from './user/UserStore';
import LocalDBFilterStore from './filter/LocalDBFilterStore';

export default class RootStore {
    appInitialized = false;

    constructor() {
      //this.uiStore = new UiStore(this);
      this.mapStore = new MapStore(this);
      this.filterStore = new FilterStore(this);
      this.imageStore = new ImageStore(this);
      this.recommendationStore = new RecommendationStore(this);
      this.userStore = new UserStore(this);
      this.localDbFilterStroe = new LocalDBFilterStore(this);
    }

    // uiStore: UiStore;
    mapStore: MapStore;
    filterStore: FilterStore;
    localDbFilterStroe: LocalDBFilterStore;
    imageStore: ImageStore;
    recommendationStore :IRecommendationStore;
    userStore: UserStore;
}
