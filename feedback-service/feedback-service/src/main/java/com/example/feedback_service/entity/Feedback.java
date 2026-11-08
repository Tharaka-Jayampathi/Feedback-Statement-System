package com.example.feedback_service.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "feedbacks", indexes = {
    @Index(name = "idx_feedback_product_id", columnList = "productId")
})
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;
    private String customerName;

    @Column(columnDefinition = "TEXT")
    private String comment;

    private String sentiment;
    private Double compoundScore;

    private LocalDateTime createdAt;

    public Feedback() {
        this.createdAt = LocalDateTime.now();
    }

    public Feedback(Long id, Long productId, String customerName, String comment, String sentiment, Double compoundScore, LocalDateTime createdAt) {
        this.id = id;
        this.productId = productId;
        this.customerName = customerName;
        this.comment = comment;
        this.sentiment = sentiment;
        this.compoundScore = compoundScore;
        this.createdAt = (createdAt != null) ? createdAt : LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    // Builder Pattern Implementation
    public static FeedbackBuilder builder() {
        return new FeedbackBuilder();
    }

    public static class FeedbackBuilder {
        private Long id;
        private Long productId;
        private String customerName;
        private String comment;
        private String sentiment;
        private Double compoundScore;
        private LocalDateTime createdAt = LocalDateTime.now();

        public FeedbackBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public FeedbackBuilder productId(Long productId) {
            this.productId = productId;
            return this;
        }

        public FeedbackBuilder customerName(String customerName) {
            this.customerName = customerName;
            return this;
        }

        public FeedbackBuilder comment(String comment) {
            this.comment = comment;
            return this;
        }

        public FeedbackBuilder sentiment(String sentiment) {
            this.sentiment = sentiment;
            return this;
        }

        public FeedbackBuilder compoundScore(Double compoundScore) {
            this.compoundScore = compoundScore;
            return this;
        }

        public FeedbackBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Feedback build() {
            return new Feedback(id, productId, customerName, comment, sentiment, compoundScore, createdAt);
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getSentiment() {
        return sentiment;
    }

    public void setSentiment(String sentiment) {
        this.sentiment = sentiment;
    }

    public Double getCompoundScore() {
        return compoundScore;
    }

    public void setCompoundScore(Double compoundScore) {
        this.compoundScore = compoundScore;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}