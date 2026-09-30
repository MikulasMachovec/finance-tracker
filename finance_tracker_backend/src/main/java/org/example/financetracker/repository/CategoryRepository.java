package org.example.financetracker.repository;

import org.example.financetracker.entity.CategoryEntity;
import org.example.financetracker.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository
        extends JpaRepository<CategoryEntity,Long> {

    List<CategoryEntity> findByOwner(UserEntity owner);

    Optional<CategoryEntity> findByOwnerAndName(
            UserEntity owner,String name
    );

    Optional<CategoryEntity> findByCategoryIdAndOwner(
            Long categoryId,
            UserEntity owner
    );
}
