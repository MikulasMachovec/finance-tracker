package org.example.financetracker.dto.budget;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetResponse {

    private Long budgetId;

    private Long categoryId;
    private String categoryName;
    private String categoryColor;

    private BigDecimal limitAmount;
    private BigDecimal spentAmount;

    private Integer month;
    private Integer year;

    private String description;
}
