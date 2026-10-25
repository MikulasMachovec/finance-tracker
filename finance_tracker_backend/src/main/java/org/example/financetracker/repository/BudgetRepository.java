package org.example.financetracker.repository;

import org.example.financetracker.entity.BudgetEntity;
import org.example.financetracker.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository
        extends JpaRepository<BudgetEntity,Long> {

    List<BudgetEntity> findByOwner(UserEntity owner);
    List<BudgetEntity> findAllByOwner_UserId(Long userId);

    List<BudgetEntity> findByOwnerAndYearAndMonth(
            UserEntity owner,
            Integer year,
            Integer month);

    Optional<BudgetEntity> findByOwnerAndCategory_CategoryIdAndYearAndMonth(
        UserEntity owner,
        Long categoryId,
        Integer year,
        Integer month
    );

    Optional<BudgetEntity> findByOwnerAndCategory_CategoryIdAndYearAndMonthAndBudgetIdNot(
            UserEntity owner,
            Long categoryId,
            Integer year,
            Integer month,
            Long budgetId
    );

    Optional<BudgetEntity> findByBudgetIdAndOwner(
            Long budgetId,
            UserEntity owner
    );

    @Query("""
    SELECT b
    FROM BudgetEntity b
    WHERE b.owner = :owner
      AND (
          b.year < :year
          OR (b.year = :year AND b.month < :month)
      )
    ORDER BY b.year DESC, b.month DESC
    """)
    List<BudgetEntity> findBudgetsBeforeMonth(
            @Param("owner") UserEntity owner,
            @Param("year") Integer year,
            @Param("month") Integer month
    );

    void deleteByCategory_CategoryIdAndOwner(Long categoryId, UserEntity owner);
}
