package org.example.financetracker.dto.Insights;

import lombok.Data;
import org.example.financetracker.dto.dashboard.CategoryBreakdownResponse;
import org.example.financetracker.dto.dashboard.DashboardResponse;
import org.example.financetracker.dto.dashboard.MonthlyFinanceResponse;

import java.util.List;

@Data
public class InsightsResponse {
    private DashboardResponse summary;

    private List<CategoryBreakdownResponse> topSpendingCategories;

    private List<MonthlyFinanceResponse> monthlySpendingTrend;

    private List<FinancialRecommendationResponse> recommendations;
}
