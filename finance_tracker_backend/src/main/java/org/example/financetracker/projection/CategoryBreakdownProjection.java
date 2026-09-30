package org.example.financetracker.projection;

import java.math.BigDecimal;

public interface CategoryBreakdownProjection {
    String getCategoryName();
    BigDecimal getAmount();
    String getCategoryColor();
}
