import { observable, action, reaction, makeAutoObservable } from 'mobx';
import i18n from '../i18n';
import RootStore from './RootStore';
import { setBrowserQueryString } from '../utils/queryStringUtils';
import logger from '../services/logger';
// import autorun  from "mobx"

export interface IUiStore  {
  language: string;
  direction: string;
  currentPage: string;
  currentTab: string;
  chartType: string;
  showFilterModal: boolean;
}
export default class UiStore implements IUiStore {
  appInitialized = false

  constructor(rootStore: RootStore) {
    // init app data
    makeAutoObservable(this, { rootStore: false, 
      language: observable,
      direction: observable,
      chartType: observable,
      currentPage: observable,
      currentTab: observable,
      updateLanguage: action,
    });
    this.rootStore = rootStore;
    this.initLang();
    this.appInitialized = false;

    // Attach reaction here
    reaction(
      () => this.language, // Observable property to track
      (locale) => {
        i18n.changeLanguage(locale).catch((error) => {
          console.error('Failed to change language', error);
        });
      }
    );
  }

  rootStore: RootStore;

  // ////////////////////////////////////////////
  @observable
  language: string = 'he'

  @action
  updateLanguage = (lang: string) => {
    this.language = lang;
    localStorage.setItem('lang', JSON.stringify(lang));
    const dir = (lang === 'en') ? 'ltr' : 'rtl';
    this.setDirection(dir);
  }

  @observable
  direction: string = 'rtl';

  @action
  setDirection = (val: string) => {
    this.direction = val;
  }

  initLang = () => {
    try {
      const slang = localStorage.getItem('lang');
      if (slang !== null) {
        const lang = JSON.parse(slang);
        this.updateLanguage(lang);
      }
    } catch (error) {
      logger.log(error);
    }
  }

  @observable
  showFilterModal: boolean = false;

  @action
  setShowFilterModal = (val: boolean) => {
    this.showFilterModal = val;
  }

  @observable
  initPage: boolean = false;
  @action
  setInitPage = (val: boolean) => {
    this.initPage = val;
  }

   /**
    * udpate the store (and gui) using given qurey from the browser (on load time)
    * @param defTab default tab to dispaly
    * @param defCity default city to choose. (can be null)
    */
  @action
  setStoreByQuery = (defTab: string, defCity?: string) => {
    const params = new URLSearchParams(window.location.search);
    //set tab
    const tab = this.getValFromQuery(params, 'tab', defTab);
      if (tab) this.setCurrentTab(tab);
    //set other stores
    this.rootStore.filterStore.setStoreByQuery(params, defCity);
    this.rootStore.mapStore.setStoreByQuery(params);
  }

   // get name by url query parmas
   getValFromQuery= (query: URLSearchParams, name: string, defVal?: string) => {
    const val = query.get(name);
    const res = (val !== null) ? val : defVal;
    return res;
 }

  /**
   * current page
   */
  @observable
  currentPage: string = 'home';

  @action
  setCurrentPage = (pageType: string) => {
    this.currentPage = pageType;
  }


  currentTab: string = 'charts';

  @action
  setCurrentTab = (tabName: string) => {
    this.currentTab = tabName;
    this.setQueryStrTab();
  }

  @action
  setQueryStrTab = () => {
    setBrowserQueryString('tab', this.currentTab);
  }


  @observable
  searchParams: string = '';

  // @action
  // setSearchParams = () => {
  //   let res = '';
  //   if (this.currentPage === 'home') {
  //     res += `?tab=${this.currentTab}`;
  //   } else {
  //     res += `?name=${this.rootStore.filterStore.cityResult}`;
  //     res += `&tab=${this.currentTab}`;
  //   }
  //   // if (!this.rootStore.filterStore.injTypes.isAllValsFalse()) {
  //   // }
  //   this.searchParams = res;
  // }

  @observable
  chartType: string = 'BarChart';

  @observable
  chartTypeList: string[] = ['BarChart', 'PieChart' ];

  @action
  updateChartType = (val: string) => {
    this.chartType = val;
  }

  @observable
  showPercentageChart: boolean = false

  @action
  updateShowPercentageChart = (val: boolean) => {
    this.showPercentageChart = val;
  }
}
