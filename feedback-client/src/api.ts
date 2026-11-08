import axios from 'axios';
import { FeedbackRequest, FeedbackResponse, SentimentSummary } from './types';

const API_BASE_URL = 'http://localhost:8080/api/feedbacks';

export const submitFeedback = async (data: FeedbackRequest): Promise<FeedbackResponse> => {
  const response = await axios.post<FeedbackResponse>(API_BASE_URL, data);
  return response.data;
};

export const getFeedbacksByProduct = async (productId: number): Promise<FeedbackResponse[]> => {
  const response = await axios.get<FeedbackResponse[]>(`${API_BASE_URL}/product/${productId}`);
  return response.data;
};

export const getProductSummary = async (productId: number): Promise<SentimentSummary> => {
  const response = await axios.get<SentimentSummary>(`${API_BASE_URL}/product/${productId}/summary`);
  return response.data;
};