package com.example.feedback_service.controller;

import com.example.feedback_service.dto.FeedbackRequestDTO;
import com.example.feedback_service.dto.FeedbackSummaryDTO;
import com.example.feedback_service.entity.Feedback;
import com.example.feedback_service.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public ResponseEntity<Feedback> addFeedback(@Valid @RequestBody FeedbackRequestDTO request) {
        Feedback savedFeedback = feedbackService.saveFeedback(request);
        return ResponseEntity.ok(savedFeedback);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Feedback>> getFeedbacksByProduct(@PathVariable Long productId) {
        List<Feedback> feedbacks = feedbackService.getFeedbacksByProduct(productId);
        return ResponseEntity.ok(feedbacks);
    }

    @GetMapping("/product/{productId}/summary")
    public ResponseEntity<FeedbackSummaryDTO> getProductSummary(@PathVariable Long productId) {
        FeedbackSummaryDTO summary = feedbackService.getProductSummary(productId);
        return ResponseEntity.ok(summary);
    }
}