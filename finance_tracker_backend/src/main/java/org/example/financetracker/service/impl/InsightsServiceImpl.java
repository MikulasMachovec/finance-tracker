package org.example.financetracker.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.financetracker.dto.Insights.FinancialRecommendationResponse;
import org.example.financetracker.dto.Insights.InsightsResponse;
import org.example.financetracker.dto.dashboard.CategoryBreakdownResponse;
import org.example.financetracker.dto.dashboard.DashboardResponse;
import org.example.financetracker.dto.dashboard.MonthlyFinanceResponse;
import org.example.financetracker.service.interfaces.DashboardService;
import org.example.financetracker.service.interfaces.InsightsService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InsightsServiceImpl implements InsightsService {

    private final DashboardService dashboardService;

    @Override
    public InsightsResponse getInsight() {
        DashboardResponse summary =
                dashboardService.getDashboard();

        List<CategoryBreakdownResponse> categories =
                dashboardService.getCategoryBreakdown();

        List<MonthlyFinanceResponse> monthlyFinances =
                dashboardService.getMonthlyFinances();


//      create recommendations
        List<FinancialRecommendationResponse> recommendations =
                createRecommendations(summary, categories);

        InsightsResponse response = new InsightsResponse();

        response.setSummary(summary);
        response.setTopSpendingCategories(categories);
        response.setMonthlySpendingTrend(monthlyFinances);
        response.setRecommendations(recommendations);


        return response;
    }

    private List<FinancialRecommendationResponse> createRecommendations(
            DashboardResponse summary,
            List<CategoryBreakdownResponse> categories
    ) {

        List<FinancialRecommendationResponse> recommendations = new ArrayList<>();

        BigDecimal savingsPercentage = summary.getSavingsPercentage();
// Handling null value
        if (savingsPercentage == null) {
            savingsPercentage = BigDecimal.ZERO;
        }

        if (savingsPercentage.compareTo(BigDecimal.valueOf(30)) >= 0) {
            recommendations.add(
                    new FinancialRecommendationResponse(
                            "SUCCESS",
                            "Excellent saving rate",
                            "You're saving " +
                                    savingsPercentage.setScale(0, RoundingMode.HALF_UP)
                                    + "% of your income this month."
                    )
            );
        } else {
            recommendations.add(
                    new FinancialRecommendationResponse(
                            "WARNING",
                            "Low savings",
                            "Consider reducing discretionary expenses."
                    )
            );
        }
    if (!categories.isEmpty()) {

        CategoryBreakdownResponse biggestCategory = categories.get(0);

        recommendations.add(
                new FinancialRecommendationResponse(
                        "SPENDING",
                        "Highest spending category",
                        biggestCategory.getCategoryName()
                                + " accounts for €"
                                + biggestCategory.getAmount()
                                + " of your expenses."
                )
        );
    }

        recommendations.add(
                new FinancialRecommendationResponse(
                        "INFO",
                        "Suggestion",
                        "Review subscriptions and recurring payments to identify possible savings."
                )
        );

        return recommendations;
    }

}
