package org.example.financetracker.projection;

import java.math.BigDecimal;

public interface MonthlyFinanceProjection {
    Integer getMonth();
    BigDecimal getIncome();
    BigDecimal getExpense();
}
