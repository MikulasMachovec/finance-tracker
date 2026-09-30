package org.example.financetracker.dto.transaction;

import lombok.Data;
import org.example.financetracker.enums.TransactionType;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TransactionResponse {

    private Long transactionId;
    private String title;
    private String description;
    private BigDecimal amount;
    private TransactionType type;
    private LocalDate transactionDate;
    private Long categoryId;
    private String categoryName;
    private String categoryColor;
}
