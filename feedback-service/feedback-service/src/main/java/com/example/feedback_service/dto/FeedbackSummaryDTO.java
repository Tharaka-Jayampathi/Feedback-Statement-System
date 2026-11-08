package com.example.feedback_service.dto;

public class FeedbackSummaryDTO {
    private Long productId;
    private long totalFeedbacks;
    private long positiveCount;
    private long neutralCount;
    private long negativeCount;
    private double averageSentimentScore;

    public FeedbackSummaryDTO() {
    }

    public FeedbackSummaryDTO(Long productId, long totalFeedbacks, long positiveCount, long neutralCount, long negativeCount, double averageSentimentScore) {
        this.productId = productId;
        this.totalFeedbacks = totalFeedbacks;
        this.positiveCount = positiveCount;
        this.neutralCount = neutralCount;
        this.negativeCount = negativeCount;
        this.averageSentimentScore = averageSentimentScore;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public long getTotalFeedbacks() {
        return totalFeedbacks;
    }

    public void setTotalFeedbacks(long totalFeedbacks) {
        this.totalFeedbacks = totalFeedbacks;
    }

    public long getPositiveCount() {
        return positiveCount;
    }

    public void setPositiveCount(long positiveCount) {
        this.positiveCount = positiveCount;
    }

    public long getNeutralCount() {
        return neutralCount;
    }

    public void setNeutralCount(long neutralCount) {
        this.neutralCount = neutralCount;
    }

    public long getNegativeCount() {
        return negativeCount;
    }

    public void setNegativeCount(long negativeCount) {
        this.negativeCount = negativeCount;
    }

    public double getAverageSentimentScore() {
        return averageSentimentScore;
    }

    public void setAverageSentimentScore(double averageSentimentScore) {
        this.averageSentimentScore = averageSentimentScore;
    }
}