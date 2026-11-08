package com.example.feedback_service.service;

import com.example.feedback_service.dto.AiResponseDTO;
import com.example.feedback_service.dto.FeedbackRequestDTO;
import com.example.feedback_service.dto.FeedbackSummaryDTO;
import com.example.feedback_service.entity.Feedback;
import com.example.feedback_service.repository.FeedbackRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class FeedbackService {

    private static final Logger log = LoggerFactory.getLogger(FeedbackService.class);

    private final FeedbackRepository feedbackRepository;
    private final RestTemplate restTemplate;

    @Value("${ai.service.url}")
    private String aiServiceUrl;

    public FeedbackService(FeedbackRepository feedbackRepository, RestTemplate restTemplate) {
        this.feedbackRepository = feedbackRepository;
        this.restTemplate = restTemplate;
    }

    public Feedback saveFeedback(FeedbackRequestDTO request) {
        String sentiment = "NEUTRAL";
        Double score = 0.0;

        // Comment එකක් තිබේ නම් පමණක් AI Service එකට call කිරීම
        if (request.getComment() != null && !request.getComment().trim().isEmpty()) {
            try {
                Map<String, String> payload = Collections.singletonMap("text", request.getComment());
                AiResponseDTO aiResponse = restTemplate.postForObject(aiServiceUrl, payload, AiResponseDTO.class);

                if (aiResponse != null) {
                    if (aiResponse.getSentiment() != null) {
                        sentiment = aiResponse.getSentiment();
                    }
                    score = aiResponse.getCompound_score();
                }
            } catch (RestClientException ex) {
                // AI Microservice එක offline හෝ timeout වුවහොත් fallback (NEUTRAL) ක්‍රියාත්මක කර log එකක් තැබීම
                log.warn("AI Sentiment Service call failed at [{}]: {}. Applying fallback NEUTRAL sentiment.",
                        aiServiceUrl, ex.getMessage());
            } catch (Exception ex) {
                log.error("Unexpected error occurred while contacting AI Sentiment Service: {}", ex.getMessage(), ex);
            }
        }

        Feedback feedback = Feedback.builder()
                .productId(request.getProductId())
                .customerName(request.getCustomerName())
                .comment(request.getComment())
                .sentiment(sentiment)
                .compoundScore(score)
                .build();

        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbacksByProduct(Long productId) {
        return feedbackRepository.findByProductIdOrderByCreatedAtDesc(productId);
    }

    public FeedbackSummaryDTO getProductSummary(Long productId) {
        List<Feedback> list = feedbackRepository.findByProductId(productId);

        long total = list.size();
        if (total == 0) {
            return new FeedbackSummaryDTO(productId, 0, 0, 0, 0, 0.0);
        }

        long positive = list.stream().filter(f -> "POSITIVE".equalsIgnoreCase(f.getSentiment())).count();
        long neutral = list.stream().filter(f -> "NEUTRAL".equalsIgnoreCase(f.getSentiment())).count();
        long negative = list.stream().filter(f -> "NEGATIVE".equalsIgnoreCase(f.getSentiment())).count();

        double avgScore = list.stream()
                .mapToDouble(Feedback::getCompoundScore)
                .average()
                .orElse(0.0);

        return new FeedbackSummaryDTO(productId, total, positive, neutral, negative, avgScore);
    }
}