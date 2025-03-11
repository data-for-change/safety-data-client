import axios from 'axios';
import { API_URL } from '../utils/globalEnvs';

class RecommendationService {
  static async getRecommendationsByTags(tags: string, lang = 'he') {
    try {
      const response = await axios.get(`${API_URL}/api/v1/recommendations/tags/`, {
        params: { tags, lang },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recommendations by tags:', error);
      throw error;
    }
  }

  static async getRecommendationsByAccident(vcl: string, lang: string = 'he') {
    try {
      const response = await axios.get(`${API_URL}/api/v1/recommendations/`, {
        params: { vcl, lang },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recommendations by vehicle:', error);
      throw error;
    }
  }
}

export default RecommendationService;