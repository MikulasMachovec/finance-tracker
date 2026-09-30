package org.example.financetracker.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.financetracker.dto.budget.BudgetRequest;
import org.example.financetracker.dto.budget.BudgetResponse;
import org.example.financetracker.entity.BudgetEntity;
import org.example.financetracker.entity.CategoryEntity;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.enums.TransactionType;
import org.example.financetracker.exception.ResourceAlreadyExistsException;
import org.example.financetracker.exception.ResourceNotFoundException;
import org.example.financetracker.mapper.BudgetMapper;
import org.example.financetracker.repository.BudgetRepository;
import org.example.financetracker.repository.CategoryRepository;
import org.example.financetracker.repository.TransactionRepository;
import org.example.financetracker.service.interfaces.AuthenticationService;
import org.example.financetracker.service.interfaces.BudgetService;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepository;
    private final BudgetMapper budgetMapper;
    private final AuthenticationService authenticationService;
    private final CategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;

//    Helper function
    private BudgetEntity getBudget(Long budgetId, UserEntity owner) {
        return budgetRepository
                .findByBudgetIdAndOwner(budgetId, owner)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Budget"));
    }

    private CategoryEntity getCategory(Long categoryId, UserEntity owner) {
        return categoryRepository
                .findByCategoryIdAndOwner(categoryId, owner)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category")
                );
    }

    private BudgetResponse toResponse(BudgetEntity budgetEntity) {
        BudgetResponse response =
                budgetMapper.toResponse(budgetEntity);

        LocalDate startDate = LocalDate.of(
                budgetEntity.getYear(),
                budgetEntity.getMonth(),
                1
        );

        LocalDate endDate = startDate
                .withDayOfMonth(startDate.lengthOfMonth());

        BigDecimal spent = transactionRepository.sumAmountByCategoryAndRangeDate(
                budgetEntity.getOwner(),
                budgetEntity.getCategory(),
                TransactionType.EXPENSE,
                startDate,
                endDate

        );

        response.setSpentAmount(
                spent == null ? BigDecimal.ZERO : spent
        );

        response.setCategoryColor(
                budgetEntity.getCategory().getColor()
        );

        return response;
    }

    @Override
    public List<BudgetResponse> getAllBudgets() {

        UserEntity owner = authenticationService.getCurrentUser();

        return budgetRepository.findByOwnerAndYearAndMonth(
                        owner,
                        LocalDate.now().getYear(),
                        LocalDate.now().getMonthValue()
                )
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public BudgetResponse getBudgetById(Long budgetId) {
        UserEntity owner = authenticationService.getCurrentUser();
        BudgetEntity budget = getBudget(budgetId, owner);
        return toResponse(budget);
    }

    @Override
    public BudgetResponse createBudget(BudgetRequest budgetRequest) {

        UserEntity owner = authenticationService.getCurrentUser();
        CategoryEntity category = getCategory(budgetRequest.getCategoryId(), owner);
// Duplicity prevention
        budgetRepository
                .findByOwnerAndCategory_CategoryIdAndYearAndMonth(
                        owner,
                        budgetRequest.getCategoryId(),
                        budgetRequest.getYear(),
                        budgetRequest.getMonth()
                )
                .ifPresent(budget -> {
                    throw new ResourceAlreadyExistsException("Budget");
                });

        BudgetEntity budget = budgetMapper.toEntity(budgetRequest);

        budget.setCategory(category);
        budget.setOwner(owner);

        BudgetEntity savedBudget = budgetRepository.save(budget);

        return toResponse(savedBudget);
    }

    @Override
    public BudgetResponse updateBudget(Long budgetId, BudgetRequest budgetRequest) {

        UserEntity owner = authenticationService.getCurrentUser();

        CategoryEntity category = getCategory(budgetRequest.getCategoryId(), owner);

        BudgetEntity budget = getBudget(budgetId, owner);
// Duplicity prevention
        budgetRepository
                .findByOwnerAndCategory_CategoryIdAndYearAndMonthAndBudgetIdNot(
                        owner,
                        budgetRequest.getCategoryId(),
                        budgetRequest.getYear(),
                        budgetRequest.getMonth(),
                        budgetId
                )
                .ifPresent(existing -> {
                    throw new ResourceAlreadyExistsException("Budget");
                });

        budgetMapper.updateEntity(budgetRequest, budget);

        budget.setCategory(category);

        BudgetEntity updatedBudget = budgetRepository.save(budget);

        return toResponse(updatedBudget);
    }

    @Override
    public void deleteBudget(Long id) {
        UserEntity owner = authenticationService.getCurrentUser();
        BudgetEntity budget = getBudget(id, owner);

        budgetRepository.delete(budget);

    }

    @Override
    public void createMissingBudgetsForCurrentMonth() {
        UserEntity owner = authenticationService.getCurrentUser();
        LocalDate now = LocalDate.now();

        int currentYear = now.getYear();
        int currentMonth = now.getMonthValue();

        LocalDate previousDate = now.minusMonths(1);

        int previousYear = previousDate.getYear();
        int previousMonth = previousDate.getMonthValue();

        List<BudgetEntity> previousBudgets =
                budgetRepository.findByOwnerAndYearAndMonth(
                        owner,
                        previousYear,
                        previousMonth
                );

        for (BudgetEntity previousBudget : previousBudgets) {

            Long categoryId =
                    previousBudget.getCategory().getCategoryId();

            boolean currentBudgetExists =
                    budgetRepository
                            .findByOwnerAndCategory_CategoryIdAndYearAndMonth(
                                    owner,
                                    categoryId,
                                    currentYear,
                                    currentMonth
                            )
                            .isPresent();
            if (!currentBudgetExists) {

                BudgetEntity newBudget = new BudgetEntity();

                newBudget.setOwner(owner);
                newBudget.setCategory(previousBudget.getCategory());
                newBudget.setLimitAmount(
                        previousBudget.getLimitAmount()
                );
                newBudget.setDescription(
                        previousBudget.getDescription()
                );
                newBudget.setYear(currentYear);
                newBudget.setMonth(currentMonth);

                budgetRepository.save(newBudget);
            }
        }
    }
}
