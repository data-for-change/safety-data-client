import FilterStore from './FilterStore';
import UiStore from './UiStore'
import MapStore from './MapStore'

export default class RootStore {
    appInitialized = false;
    constructor() {
        this.uiStore = new UiStore(this)
        this.mapStore = new MapStore(this)
        this.filterStore = new FilterStore(this)
    }
    uiStore: UiStore;
    mapStore: MapStore;
    filterStore: FilterStore;
}