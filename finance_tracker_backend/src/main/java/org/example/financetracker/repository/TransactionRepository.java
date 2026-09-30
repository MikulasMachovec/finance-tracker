package org.example.financetracker.repository;

import org.example.financetracker.entity.CategoryEntity;
import org.example.financetracker.entity.TransactionEntity;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.enums.TransactionType;
import org.example.financetracker.projection.CategoryBreakdownProjection;
import org.example.financetracker.projection.MonthlyFinanceProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TransactionRepository
        extends JpaRepository<TransactionEntity, Long> {
    List<TransactionEntity> findByOwner(UserEntity owner);

    List<TransactionEntity> findByOwnerAndTransactionDateBetween(
            UserEntity owner,
            LocalDate start,
            LocalDate end
    );

    Optional<TransactionEntity> findByTransactionIdAndOwner(
            Long transactionId,
            UserEntity owner
    );

    @Query("""
    SELECT COALESCE(SUM(t.amount), 0)
        FROM TransactionEntity t
        WHERE t.owner = :owner
          AND t.category = :category
          AND t.type = :type
          AND t.transactionDate BETWEEN :startDate AND :endDate
    """)
    BigDecimal sumAmountByCategoryAndRangeDate(
            UserEntity owner,
            CategoryEntity category,
            TransactionType type,
            LocalDate startDate,
            LocalDate endDate
    );

    @Query("""
        SELECT COALESCE(SUM(t.amount), 0)
        FROM TransactionEntity t
        WHERE t.owner = :owner
          AND t.type = :type
          AND t.transactionDate BETWEEN :startDate AND :endDate
    """)
    BigDecimal sumAmountByOwnerAndTypeAndDateRange(
            UserEntity owner,
            TransactionType type,
            LocalDate startDate,
            LocalDate endDate
    );

    @Query("""
        SELECT
            MONTH(t.transactionDate) as month,
            COALESCE(SUM(
                CASE
                    WHEN t.type = 'INCOME' THEN t.amount
                        ELSE 0
                END
                ), 0) as income,
            COALESCE(SUM(
                        CASE
                            WHEN t.type = 'EXPENSE' THEN t.amount
                            ELSE 0
                        END
                    ), 0) AS expense
            FROM TransactionEntity t
             WHERE t.owner = :owner
               AND t.transactionDate BETWEEN :startDate AND :endDate
             GROUP BY MONTH(t.transactionDate)
             ORDER BY MONTH(t.transactionDate)
    """)
    List<MonthlyFinanceProjection> findMonthlyFinance(
            UserEntity owner,
            LocalDate startDate,
            LocalDate endDate
    );

    @Query("""
        SELECT
           COALESCE(SUM(t.amount), 0) AS amount,
           t.category.name AS categoryName,
           t.category.color AS categoryColor
       FROM TransactionEntity t
       WHERE t.owner = :owner
         AND t.type = :type
         AND t.transactionDate BETWEEN :startDate AND :endDate
       GROUP BY t.category.name
       ORDER BY SUM(t.amount) DESC
    """)
    List<CategoryBreakdownProjection> getCategoryBreakdown(
            UserEntity owner,
            TransactionType type,
            LocalDate startDate,
            LocalDate endDate
    );

}
