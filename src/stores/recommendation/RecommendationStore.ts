import { makeAutoObservable } from 'mobx';
import RecommendationService from '../../services/RecommendationService';
import logger from '../../services/logger';
import RootStore from '../RootStore';
import { Recommendation } from '../../types';

export interface IRecommendationStore{
    loading: boolean;
    setLoading: (value: boolean) => void;
    recommendationsList: Recommendation[]; 
    fetchRecommendationsByTags: (tags: string, lang: string) => void;
    fetchRecommendationsByAccident: (vcl: string, lang : string) => void;  
    //edit / create 
    isOpenModal: boolean;
    selectedRecommendation: Recommendation | null;
    openModal: (recommendation?: Recommendation) => void;   
    submitRecommendation: (data: Recommendation) => void;   
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
  setLoading = (value:boolean) => {
    this.loading = value;
  }

  fetchRecommendationsByTags = async(tags: string, lang: string = 'he') => {
    //this.setLoading(true);
    try {
      this.recommendationsList = await RecommendationService.getRecommendationsByTags(tags, lang);
    } catch (error) {
      logger.log(error)
    } finally {
      this.setLoading(false);
    }
  }

  fetchRecommendationsByAccident = async (vcl: string, lang : string= 'he') =>{
    this.setLoading(true);
    try {
      this.recommendationsList = await RecommendationService.getRecommendationsByAccident(vcl, lang);
    } catch (error:unknown) {
        logger.log(error);
    } finally {
      this.setLoading(false);
    }
  }
  //edit / create 
  isOpenModal = false;
  openModal = (recommendation?: Recommendation) => {
    this.isOpenModal = true;
    this.selectedRecommendation = recommendation || null;
  }
  closeModal =() => {
    this.isOpenModal = false;
    this.selectedRecommendation = null;
  }
  selectedRecommendation: Recommendation | null = null;

  submitRecommendation = async (data: Recommendation) => {
    if(data._id === ""){
      console.log ("create recommand",data )
    }
    else{
      console.log ("update recommand",data )
    }
  };
}

