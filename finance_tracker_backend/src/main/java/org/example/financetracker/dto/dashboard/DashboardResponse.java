package org.example.financetracker.dto.dashboard;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DashboardResponse {

    private BigDecimal income;
    private BigDecimal expense;
    private BigDecimal balance;
    private BigDecimal savingsPercentage;
}
