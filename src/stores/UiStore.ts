import { makeAutoObservable, reaction } from 'mobx';
import i18n from '../i18n';
import RootStore from './RootStore';
import { setBrowserQueryString } from '../utils/queryStringUtils';
import logger from '../services/logger';

export default class UiStore {
  rootStore: RootStore;
  appInitialized = false;
  
  language = 'he';
  direction = 'rtl';
  showFilterModal = false;
  initPage = false;
  currentPage = 'home';
  currentTab = 'charts';
  chartType = 'BarChart';
  showPercentageChart = false;
  chartTypeList = ['BarChart', 'PieChart'];
  isHeaderExpanded = false; 

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, { rootStore: false });

    this.initLang();

    reaction(() => this.language, (locale) => {
      i18n.changeLanguage(locale).catch(console.error);
    });
  }

  updateLanguage = (lang: string) => {
    this.language = lang;
    localStorage.setItem('lang', JSON.stringify(lang));
    this.direction = lang === 'en' ? 'ltr' : 'rtl';
    this.setHeaderExpanded(false);
  };

  setDirection = (val: string) => { this.direction = val; };
  setShowFilterModal = (val: boolean) => { this.showFilterModal = val; };
  setInitPage = (val: boolean) => { this.initPage = val; };
  setCurrentPage = (page: string) => { this.currentPage = page; };
  setCurrentTab = (tab: string) => {
    this.currentTab = tab;
    setBrowserQueryString('tab', tab);
  };
  updateChartType = (val: string) => { this.chartType = val; };
  updateShowPercentageChart = (val: boolean) => { this.showPercentageChart = val; };

  setHeaderExpanded = (value:boolean) =>{
    this.isHeaderExpanded = value;
  }
  toggleHeaderExpanded = () => {
    this.isHeaderExpanded = !this.isHeaderExpanded;
  };

  private initLang() {
    try {
      const storedLang = localStorage.getItem('lang');
      if (storedLang) this.updateLanguage(JSON.parse(storedLang));
    } catch (error) {
      logger.log(error);
    }
  }

  setStoreByQuery = (defaultTab: string, defaultCity?: string) => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') || defaultTab;
    if (tab) this.setCurrentTab(tab);

    this.rootStore.filterStore.setStoreByQuery(params, defaultCity);
    this.rootStore.mapStore.setStoreByQuery(params);
  };
}
