import { observable, action, reaction } from 'mobx';
import i18n from '../i18n';
import RootStore from './RootStore';
// import autorun  from "mobx"

export default class UiStore {
  appInitialized = false

  constructor(rootStore: RootStore) {
    // init app data
    this.rootStore = rootStore;
    this.initLang();
    this.appInitialized = false;
  }

  rootStore: RootStore;

  // ////////////////////////////////////////////
  @observable
  language: string = 'he'

  @action
  updateLanguage = (lang: string) => {
    this.language = lang;
    localStorage.setItem('lang', JSON.stringify(lang));
  }

  reactionChangeLang = reaction(
    () => this.language,
    (locale) => {
      i18n.changeLanguage(locale);
    },
  )

  initLang = () => {
    try {
      const slang = localStorage.getItem('lang');
      if (slang !== null) {
        const lang = JSON.parse(slang);
        this.updateLanguage(lang);
      }
    } catch (error) {
      console.log(error);
    }
  }

  @observable
  chartType: string = 'BarChart';

  @observable
  chartTypeList: string[] = ['BarChart', 'PieChart', 'TreeMap'];

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
