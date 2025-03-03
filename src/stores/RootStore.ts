import FilterStore from './filter/FilterStore';
import UiStore from './UiStore';
import MapStore from './MapStore';
import ImageStore from './image/ImageStore'

export default class RootStore {
    appInitialized = false;

    constructor() {
      this.uiStore = new UiStore(this);
      this.mapStore = new MapStore(this);
      this.filterStore = new FilterStore(this);
      this.imageStore = new ImageStore(this);
    }

    uiStore: UiStore;

    mapStore: MapStore;

    filterStore: FilterStore;

    imageStore: ImageStore;
}
