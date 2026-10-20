package org.example.financetracker.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.financetracker.entity.BudgetEntity;
import org.example.financetracker.entity.CategoryEntity;
import org.example.financetracker.entity.TransactionEntity;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.repository.BudgetRepository;
import org.example.financetracker.repository.CategoryRepository;
import org.example.financetracker.repository.TransactionRepository;
import org.example.financetracker.service.interfaces.AuthenticationService;
import org.example.financetracker.service.interfaces.ExportDataService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExportDataServiceImpl
        implements ExportDataService {

    private final TransactionRepository transactionRepository;
    private final BudgetRepository budgetRepository;
    private final CategoryRepository categoryRepository;
    private final AuthenticationService authenticationService;

    @Override
    @Transactional(readOnly = true)
    public byte[] exportTransactionsCsv(
            LocalDate fromDate,
            LocalDate toDate
    ) {
        UserEntity user = authenticationService.getCurrentUser();

        List<TransactionEntity> transactions;

//      Export all transactions when neither date is provided.
        if (fromDate == null && toDate == null) {
            transactions = transactionRepository
                    .findAllByOwner_UserId(user.getUserId());

        } else {
            // If a date range is provided, both dates are required.
            if (fromDate == null || toDate == null) {
                throw new IllegalArgumentException(
                        "Both fromDate and toDate are required."
                );
            }

            if (fromDate.isAfter(toDate)) {
                throw new IllegalArgumentException(
                        "fromDate must not be after toDate."
                );
            }

            transactions = transactionRepository
                    .findAllByOwner_UserIdAndTransactionDateBetween(
                            user.getUserId(),
                            fromDate,
                            toDate
                    );
        }

        StringBuilder csv = new StringBuilder();

        // UTF-8 BOM helps Excel to recognize UTF-8 characters.
        csv.append("\uFEFF");

        csv.append(
                "Transaction ID,Date,Title,Type,Amount,Category,Description\r\n"
        );

        for (TransactionEntity transaction : transactions) {
            appendRow(
                    csv,
                    transaction.getTransactionId(),
                    transaction.getTransactionDate(),
                    transaction.getTitle(),
                    transaction.getType(),
                    transaction.getAmount(),
                    transaction.getCategory() == null
                        ? ""
                        : transaction.getCategory().getName(),
                    transaction.getDescription()
            );
        }

        return csv.toString().getBytes(StandardCharsets.UTF_8);
    }

    @Override
    public byte[] exportBudgetsCsv() {
        UserEntity user = authenticationService.getCurrentUser();

        List<BudgetEntity> budgets = budgetRepository.findAllByOwner_UserId(user.getUserId());

        StringBuilder csv = new StringBuilder();

        // UTF-8 BOM helps Excel to recognize UTF-8 characters.
        csv.append("\uFEFF");

        csv.append(
                "Budget ID,Limit Amount,Description,Month,Year,Category,Created At,Updated At\r\n"
        );

        for (BudgetEntity budget : budgets) {
            appendRow(
                    csv,
                    budget.getBudgetId(),
                    budget.getLimitAmount(),
                    budget.getDescription() == null ? "" : budget.getDescription(),
                    budget.getMonth(),
                    budget.getYear(),
                    budget.getCreatedAt(),
                    budget.getUpdatedAt()
            );
        }

        return csv.toString().getBytes(StandardCharsets.UTF_8);
    }

    @Override
    public byte[] exportCategoriesCsv() {
        UserEntity user = authenticationService.getCurrentUser();

        List<CategoryEntity> categories = categoryRepository.findAllByOwner_UserId(user.getUserId());

        StringBuilder csv = new StringBuilder();

        // UTF-8 BOM helps Excel to recognize UTF-8 characters.
        csv.append("\uFEFF");

        csv.append(
                "Category ID,Name,Color,\r\n"
        );

        for (CategoryEntity category : categories) {
            appendRow(
                    csv,
                    category.getCategoryId(),
                    category.getName(),
                    category.getColor()
            );
        }

        return csv.toString().getBytes(StandardCharsets.UTF_8);
    }

    private void appendRow(
            StringBuilder csv,
            Object... values
    ) {
        for (int i = 0; i < values.length; i ++) {
            if (i > 0) {
                csv.append(",");
            }

//            Text columns: title, type, category, description
            boolean textField = i == 2 || i == 3 || i == 5 || i == 6;

            csv.append(escapeCsvValue(values[i], textField));
        }
        csv.append("\r\n");
    }

    private String escapeCsvValue(Object value, boolean protectedFormula) {
        if (value == null) {
            return "\"\"";
        }

        String text = value.toString();

        //Reduce risk of spreadsheet formula injection
        if (protectedFormula
                && text.matches("^[\\s]*[=+@].*")) {
            text = "'" + text;
        }

        // Double embedded quotes and quote the entire field.
        return "\"" + text.replace("\"", "\"\"") + "\"";
    }

}
