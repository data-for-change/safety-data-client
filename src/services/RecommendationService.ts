import axios from 'axios';
import { API_URL } from '../utils/globalEnvs';
import { Recommendation } from '../types';
import { getValidToken } from '../utils/authUtils';

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

  static async addRecommendation(data: Recommendation) {
    try {
      const token = getValidToken();
      const response = await axios.post(`${API_URL}/api/v1/recommendations/`, data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error && error.response?.status === 403) {
        console.error('Unauthorized: You do not have permission to perform this action.');
      }
      else {
        console.error('Error adding recommendation:', error);
        throw error;
      }
    }
  }

  static async editRecommendation(id: string, data: Recommendation) {
    try {
      const token = getValidToken();
      const response = await axios.put(`${API_URL}/api/v1/recommendations/${id}`, data,
        { headers: { Authorization: `Bearer ${token}` }, }
      );
      return response.data;
    } catch (error: any) {
      if (error && error.response?.status === 403) {
        console.error('Unauthorized: You do not have permission to perform this action.');
      }else {
        console.error('Error editing recommendation:', error);
        throw error;
      }
    }
  }
}

export default RecommendationService;