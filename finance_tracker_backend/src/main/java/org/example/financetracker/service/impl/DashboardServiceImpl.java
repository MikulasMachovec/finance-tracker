package org.example.financetracker.service.impl;

import lombok.AllArgsConstructor;
import org.example.financetracker.dto.dashboard.CategoryBreakdownResponse;
import org.example.financetracker.dto.dashboard.DashboardResponse;
import org.example.financetracker.dto.dashboard.MonthlyFinanceResponse;
import org.example.financetracker.entity.TransactionEntity;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.enums.TransactionType;
import org.example.financetracker.mapper.DashboardMapper;
import org.example.financetracker.projection.CategoryBreakdownProjection;
import org.example.financetracker.projection.MonthlyFinanceProjection;
import org.example.financetracker.repository.TransactionRepository;
import org.example.financetracker.service.interfaces.AuthenticationService;
import org.example.financetracker.service.interfaces.DashboardService;
import org.example.financetracker.service.interfaces.TransactionService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final TransactionRepository transactionRepository;
    private final AuthenticationService authenticationService;
    private final DashboardMapper dashboardMapper;

    @Override
    public DashboardResponse getDashboard() {

        UserEntity owner = authenticationService.getCurrentUser();

        YearMonth currentMonth = YearMonth.now();

        LocalDate startDate = currentMonth.atDay(1);
        LocalDate endDate = currentMonth.atEndOfMonth();

        BigDecimal income = transactionRepository
                .sumAmountByOwnerAndTypeAndDateRange(
                        owner,
                        TransactionType.INCOME,
                        startDate,
                        endDate
                );

        BigDecimal expense = transactionRepository
                .sumAmountByOwnerAndTypeAndDateRange(
                        owner,
                        TransactionType.EXPENSE,
                        startDate,
                        endDate
                );

        BigDecimal balance = income.subtract(expense);

        BigDecimal savingsPercentage = BigDecimal.ZERO;

        if (income.compareTo(BigDecimal.ZERO) > 0) {

            savingsPercentage = balance
                    .divide(income, 4, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100));
        }


        return dashboardMapper.toResponse(
                income,
                expense,
                balance,
                savingsPercentage
        );
    }

    @Override
    public List<MonthlyFinanceResponse> getMonthlyFinances() {

        UserEntity owner = authenticationService.getCurrentUser();

        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate
                .minusMonths(5)
                .withDayOfMonth(1);

        List<MonthlyFinanceProjection> data =
                transactionRepository.findMonthlyFinance(
                        owner,
                        startDate,
                        endDate
                );

        Map<Integer, MonthlyFinanceProjection> existing =
                data.stream()
                        .collect(Collectors.toMap(
                                MonthlyFinanceProjection::getMonth,
                                item -> item
                        ));

        List<MonthlyFinanceResponse> result = new ArrayList<>();

        for (int i = 0; i < 6; i++) {
            LocalDate month = startDate.plusMonths(i);

            MonthlyFinanceProjection item = existing.get(month.getMonthValue());

            BigDecimal income = BigDecimal.ZERO;
            BigDecimal expense = BigDecimal.ZERO;

            if (item != null) {
                income = item.getIncome();
                expense = item.getExpense();
            }

            result.add(new MonthlyFinanceResponse(
                    month.getMonth()
                            .getDisplayName(
                                    TextStyle.SHORT,
                                    Locale.ENGLISH
                            ),
                    income,
                    expense
            ));

        }

        return result;
    }

    @Override
    public List<CategoryBreakdownResponse> getCategoryBreakdown() {

        UserEntity owner = authenticationService.getCurrentUser();

        YearMonth yearMonth = YearMonth.now();
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        List<CategoryBreakdownProjection> result =
                transactionRepository.getCategoryBreakdown(
                        owner,
                        TransactionType.EXPENSE,
                        startDate,
                        endDate
                );

        return result.stream()
                .map(dashboardMapper::toResponse)
                .toList();
    }
}
