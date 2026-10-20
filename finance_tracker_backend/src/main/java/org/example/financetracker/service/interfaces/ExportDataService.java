package org.example.financetracker.service.interfaces;

import java.time.LocalDate;

public interface ExportDataService {
    byte [] exportTransactionsCsv(
            LocalDate fromDate,
            LocalDate toDate
    );

    byte [] exportBudgetsCsv();

    byte [] exportCategoriesCsv();
}
