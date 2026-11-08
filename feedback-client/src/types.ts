export interface FeedbackRequest {
  productId: number;
  customerName: string;
  comment: string;
}

export interface FeedbackResponse {
  id: number;
  productId: number;
  customerName: string;
  comment: string;
  sentiment: string;
  compoundScore: number;
  createdAt: string;
}

export interface SentimentSummary {
  productId: number;
  totalFeedbacks: number;
  positiveCount: number;
  neutralCount: number;
  negativeCount: number;
  averageSentimentScore: number;
}