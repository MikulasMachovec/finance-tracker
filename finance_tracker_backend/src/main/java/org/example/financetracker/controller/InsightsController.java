package org.example.financetracker.controller;

import lombok.RequiredArgsConstructor;
import org.example.financetracker.dto.Insights.InsightsResponse;
import org.example.financetracker.service.interfaces.InsightsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/insights")
@RequiredArgsConstructor
public class InsightsController {
    private final InsightsService insightsService;

    @GetMapping
    public InsightsResponse getInsights() {
        return insightsService.getInsight();
    }
}
