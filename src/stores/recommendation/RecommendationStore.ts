import { makeAutoObservable, observable } from 'mobx';
import RecommendationService from '../../services/RecommendationService';
import logger from '../../services/logger';
import RootStore from '../RootStore';
import { Recommendation } from '../../types';

export interface IRecommendationStore {
  loading: boolean;
  setLoading: (value: boolean) => void;
  recommendationsList: Recommendation[];
  fetchRecommendationsByTags: (tags: string, lang: string) => void;
  fetchRecommendationsByAccident: (vcl: string, lang: string) => void;
  //edit / create 
  isOpenModal: boolean;
  successMessage: string;
  errorMessage: string;
  selectedRecommendation: Recommendation | null;
  openModal: (recommendation?: Recommendation) => void;
  submitRecommendation: (data: Recommendation) => void;
  clearMessages: () => void;
  setErrorMessage: (value: string) => void;
  setSuccessMessage: (value: string) => void;
}
export default class RecommendationStore implements IRecommendationStore {

  constructor(rootStore: RootStore) {
    // init app data
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
  rootStore: RootStore;
  recommendationsList: Recommendation[] = [];
  setRecommendationsList(data: Recommendation[]) {
    this.recommendationsList = data;
  }
  loading = false;
  setLoading = (value: boolean) => {
    this.loading = value;
  }

  fetchRecommendationsByTags = async (tags: string, lang: string = 'he') => {
    //this.setLoading(true);
    try {
      const list = await RecommendationService.getRecommendationsByTags(tags, lang);
      this.setRecommendationsList(list);
    } catch (error) {
      logger.log(error)
    } finally {
      this.setLoading(false);
    }
  }

  fetchRecommendationsByAccident = async (vcl: string, lang: string = 'he') => {
    this.setLoading(true);
    try {
      const list = await RecommendationService.getRecommendationsByAccident(vcl, lang);
      this.setRecommendationsList(list);
    } catch (error: unknown) {
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
  closeModal = () => {
    this.isOpenModal = false;
    this.selectedRecommendation = null;
  }
  selectedRecommendation: Recommendation | null = null;
  successMessage = "";
  setSuccessMessage = (value: string) => {
    this.successMessage = value;
    console.log('setSuccessMessage', this.successMessage);
  }
  errorMessage = "";
  setErrorMessage = (value: string) => {
    this.errorMessage = value;
  }
  clearMessages = (): void => {
    this.setSuccessMessage("");
    this.setErrorMessage("");
  };
  submitRecommendation = async (data: Recommendation) => {
    if (!this.rootStore.userStore.hasEditPermission) {
      this.setErrorMessage("Unauthorized_no_permission");
      return;
    }
    try {
      if (data._id === "") {
        const { _id, ...newData } = data;
        await RecommendationService.addRecommendation(newData);
        this.setSuccessMessage("Recommendation_added");
      } else {
        await RecommendationService.editRecommendation(data._id, data);
        this.setSuccessMessage("Recommendation_updated");
      }
      this.setErrorMessage("");
    } catch (error) {
      console.error("Failed to submit recommendation:", error);
      this.setErrorMessage("Failed_submit_recommendation");
    }
  }

}

