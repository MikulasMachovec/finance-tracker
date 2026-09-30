package org.example.financetracker.dto.Insights;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FinancialRecommendationResponse {

    private String type;
    private String title;
    private String message;
}
