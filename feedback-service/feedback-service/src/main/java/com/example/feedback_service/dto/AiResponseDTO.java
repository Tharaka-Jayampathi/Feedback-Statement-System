package com.example.feedback_service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AiResponseDTO {
    private String sentiment;

    @JsonProperty("compound_score")
    private double compound_score;

    public AiResponseDTO() {}

    public String getSentiment() { return sentiment; }
    public void setSentiment(String sentiment) { this.sentiment = sentiment; }

    public double getCompound_score() { return compound_score; }
    public void setCompound_score(double compound_score) { this.compound_score = compound_score; }
}