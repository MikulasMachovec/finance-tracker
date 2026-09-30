package org.example.financetracker.repository;

import org.example.financetracker.entity.BudgetEntity;
import org.example.financetracker.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository
        extends JpaRepository<BudgetEntity,Long> {

    List<BudgetEntity> findByOwner(UserEntity owner);

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
}
