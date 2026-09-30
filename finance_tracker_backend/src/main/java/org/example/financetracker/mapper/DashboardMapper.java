package org.example.financetracker.mapper;

import org.example.financetracker.dto.cateogry.CategoryResponse;
import org.example.financetracker.dto.dashboard.CategoryBreakdownResponse;
import org.example.financetracker.dto.dashboard.DashboardResponse;
import org.example.financetracker.projection.CategoryBreakdownProjection;
import org.mapstruct.Mapper;

import java.math.BigDecimal;

@Mapper(componentModel = "spring")
public interface DashboardMapper {
    default DashboardResponse toResponse(
            BigDecimal income,
            BigDecimal expense,
            BigDecimal balance,
            BigDecimal savingsPercentage
    ){
        DashboardResponse response = new DashboardResponse();
        response.setIncome(income);
        response.setExpense(expense);
        response.setBalance(balance);
        response.setSavingsPercentage(savingsPercentage);

        return response;
    }
    CategoryBreakdownResponse toResponse(CategoryBreakdownProjection projection);
}
