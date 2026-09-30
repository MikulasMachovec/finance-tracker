package org.example.financetracker.controller;

import lombok.RequiredArgsConstructor;
import org.example.financetracker.dto.dashboard.CategoryBreakdownResponse;
import org.example.financetracker.dto.dashboard.DashboardResponse;
import org.example.financetracker.dto.dashboard.MonthlyFinanceResponse;
import org.example.financetracker.service.interfaces.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    public final DashboardService dashboardService;

    @GetMapping
    public DashboardResponse getDashboard() {
        return dashboardService.getDashboard();
    }

    @GetMapping("/monthly")
    public List<MonthlyFinanceResponse> getMonthlyFinance() {
        return dashboardService.getMonthlyFinances();
    }

    @GetMapping("/category-breakdown")
    public List<CategoryBreakdownResponse> getCategoryBreakdown() {
        return dashboardService.getCategoryBreakdown();
    }
}
