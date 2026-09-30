package org.example.financetracker.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.financetracker.dto.budget.BudgetRequest;
import org.example.financetracker.dto.budget.BudgetResponse;
import org.example.financetracker.service.interfaces.BudgetService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/budgets")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;

    @GetMapping
    public List<BudgetResponse> getAllBudgets() {
        return budgetService.getAllBudgets();
    }

    @GetMapping("/{budgetId}")
    public BudgetResponse getBudgetById(
            @PathVariable Long budgetId
    ){
        return budgetService.getBudgetById(budgetId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BudgetResponse createBudget(
            @Valid @RequestBody BudgetRequest budgetRequest
    ){
        return budgetService.createBudget(budgetRequest);
    }

    @PutMapping("/{budgetId}")
    public BudgetResponse updateBudget(
            @PathVariable Long budgetId,
            @Valid @RequestBody BudgetRequest budgetRequest
    ){
        return budgetService.updateBudget(budgetId, budgetRequest);
    }

    @DeleteMapping("/{budgetId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBudget(
            @PathVariable Long budgetId
    ){
        budgetService.deleteBudget(budgetId);
    }

}
