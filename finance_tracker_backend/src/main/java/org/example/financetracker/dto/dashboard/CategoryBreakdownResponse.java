package org.example.financetracker.dto.dashboard;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CategoryBreakdownResponse {
    private String categoryName;
    private BigDecimal amount;
    private String categoryColor;
}
