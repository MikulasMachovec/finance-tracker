package org.example.financetracker.service.interfaces;

import org.example.financetracker.dto.budget.BudgetRequest;
import org.example.financetracker.dto.budget.BudgetResponse;

import java.util.List;

public interface BudgetService {

    List<BudgetResponse> getAllBudgets();

    BudgetResponse getBudgetById(Long id);

    BudgetResponse createBudget(BudgetRequest budgetRequest);

    BudgetResponse updateBudget(Long budgetId, BudgetRequest budgetRequest);

    void deleteBudget(Long id);

    void createMissingBudgetsForCurrentMonth();
}
