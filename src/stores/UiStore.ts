import { observable, action, reaction } from "mobx"
import i18n from "../i18n";
import RootStore from "./RootStore";
//import autorun  from "mobx"

export default class UiStore {
  appInitialized = false
  constructor(rootStore: RootStore) {
    // init app data
    this.rootStore = rootStore
    this.appInitialized = false;
  }
  rootStore: RootStore;
  //////////////////////////////////////////////
  @observable
  language: string = "he"
  @action
  updateLanguage = (lang: string) => {
    this.language = lang;
  }
  reactionChangeLang = reaction(
    () => this.language,
    locale => {
      i18n.changeLanguage(locale);
    }
  )
}