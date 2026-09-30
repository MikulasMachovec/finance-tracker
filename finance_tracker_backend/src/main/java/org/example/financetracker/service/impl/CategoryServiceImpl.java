package org.example.financetracker.service.impl;

import lombok.AllArgsConstructor;
import org.example.financetracker.dto.cateogry.CategoryRequest;
import org.example.financetracker.dto.cateogry.CategoryResponse;
import org.example.financetracker.entity.BudgetEntity;
import org.example.financetracker.entity.CategoryEntity;
import org.example.financetracker.entity.TransactionEntity;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.enums.TransactionType;
import org.example.financetracker.exception.ResourceNotFoundException;
import org.example.financetracker.mapper.CategoryMapper;
import org.example.financetracker.repository.CategoryRepository;
import org.example.financetracker.service.interfaces.AuthenticationService;
import org.example.financetracker.service.interfaces.CategoryService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final AuthenticationService  authenticationService;

    private CategoryEntity getCategory(
            Long categoryId,
            UserEntity owner
    ) {
        return categoryRepository
                .findByCategoryIdAndOwner(categoryId, owner)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category")
                );
    }

    private CategoryResponse toResponse(CategoryEntity category) {

        CategoryResponse response =
                categoryMapper.toResponse(category);

        LocalDate now = LocalDate.now();

        LocalDate startDate =
                now.withDayOfMonth(1);

        LocalDate endDate =
                now.withDayOfMonth(now.lengthOfMonth());

        List<TransactionEntity> transactions =
                category.getTransactions() == null
                        ? List.of()
                        : category.getTransactions()
                        .stream()
                        .filter(t ->
                                !t.getTransactionDate().isBefore(startDate)
                                &&
                                !t.getTransactionDate().isAfter(endDate)
                        )
                        .toList();

        List<BudgetEntity> budgets =
                category.getBudgets() == null
                        ? List.of()
                        : category.getBudgets();

        response.setTransactions(
                (long) transactions.size()
        );

        response.setSpent(
                transactions.stream()
                        .filter(t -> t.getType() == TransactionType.EXPENSE)
                        .map(TransactionEntity::getAmount)
                        .reduce(BigDecimal.ZERO, BigDecimal::add)
        );

        BigDecimal budget =
                budgets
                    .stream()
                    .filter(b ->
                            b.getYear().equals(now.getYear())
                            &&
                            b.getMonth().equals(now.getMonthValue())
                    )
                            .map(BudgetEntity::getLimitAmount)
                            .findFirst()
                            .orElse(BigDecimal.ZERO);

        response.setBudget(budget);

        return response;
    }

    @Override
    public List<CategoryResponse> getAllCategories() {

        UserEntity owner = authenticationService.getCurrentUser();

        return categoryRepository.findByOwner(owner)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public CategoryResponse getCategoryById(Long categoryId) {

        UserEntity owner = authenticationService.getCurrentUser();
        CategoryEntity category = getCategory(categoryId, owner);

        return toResponse(category);
    }

    @Override
    public CategoryResponse createCategory(CategoryRequest request) {

        UserEntity owner = authenticationService.getCurrentUser();
        CategoryEntity category = categoryMapper.toEntity(request);
        category.setOwner(owner);

        CategoryEntity savedCategory = categoryRepository.save(category);
        return toResponse(savedCategory);
    }

    @Override
    public CategoryResponse updateCategory(Long categoryId, CategoryRequest request) {
        UserEntity owner = authenticationService.getCurrentUser();
        CategoryEntity category = getCategory(categoryId, owner);

        categoryMapper.updateEntity(request, category);
        CategoryEntity savedCategory = categoryRepository.save(category);

        return toResponse(savedCategory);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        UserEntity owner = authenticationService.getCurrentUser();
        CategoryEntity category = getCategory(categoryId, owner);

        categoryRepository.delete(category);
    }
}
