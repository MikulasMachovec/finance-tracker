package org.example.financetracker.mapper;

import org.example.financetracker.dto.budget.BudgetRequest;
import org.example.financetracker.dto.budget.BudgetResponse;
import org.example.financetracker.entity.BudgetEntity;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface BudgetMapper {

    @Mapping(target = "budgetId", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    BudgetEntity toEntity(BudgetRequest budgetRequest);

    @Mapping(target = "categoryId", source = "category.categoryId")
    @Mapping(target = "categoryName", source = "category.name")
    BudgetResponse toResponse(BudgetEntity budgetEntity);

    @Mapping(target = "budgetId", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntity(
            BudgetRequest budgetRequest,
            @MappingTarget BudgetEntity budgetEntity);
}
