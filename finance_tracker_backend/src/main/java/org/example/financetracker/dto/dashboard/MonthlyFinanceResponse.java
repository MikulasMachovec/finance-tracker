package org.example.financetracker.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class MonthlyFinanceResponse {

    private String month;
    private BigDecimal income;
    private BigDecimal expense;
}
