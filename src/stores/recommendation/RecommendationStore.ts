import { makeAutoObservable } from 'mobx';
import RecommendationService from '../../services/RecommendationService';
import logger from '../../services/logger';
import RootStore from '../RootStore';
import { Recommendation } from '../../types';

export interface IRecommendationStore{
    recommendationsList: Recommendation[];    
}
export default class RecommendationStore implements IRecommendationStore {

 constructor(rootStore: RootStore) {
      // init app data
      this.rootStore = rootStore;
      makeAutoObservable(this);
  }
  rootStore: RootStore;
  recommendationsList:Recommendation[]= [];
  loading = false;

  async fetchRecommendationsByTags(tags: string, lang: string = 'he') {
    this.loading = true;
    try {
      this.recommendationsList = await RecommendationService.getRecommendationsByTags(tags, lang);
    } catch (error) {
      logger.log(error)
    } finally {
      this.loading = false;
    }
  }

  async fetchRecommendationsByAccident(vcl: string, lang : string= 'he') {
    this.loading = true;
    try {
      this.recommendationsList = await RecommendationService.getRecommendationsByAccident(vcl, lang);
    } catch (error:unknown) {
        logger.log(error);
    } finally {
      this.loading = false;
    }
  }
}


