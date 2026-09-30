package org.example.financetracker.service.interfaces;

import org.example.financetracker.dto.dashboard.CategoryBreakdownResponse;
import org.example.financetracker.dto.dashboard.DashboardResponse;
import org.example.financetracker.dto.dashboard.MonthlyFinanceResponse;

import java.util.List;

public interface DashboardService {
    DashboardResponse getDashboard();
    List<MonthlyFinanceResponse> getMonthlyFinances();
    List<CategoryBreakdownResponse> getCategoryBreakdown();
}
