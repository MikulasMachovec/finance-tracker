package org.example.financetracker.dto.budget;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BudgetRequest {

    @NotNull
    private Long categoryId;

    @NotNull
    @Positive
    private BigDecimal limitAmount;

    @NotNull
    private Integer month;

    @NotNull
    private Integer year;

    private String description;
}
