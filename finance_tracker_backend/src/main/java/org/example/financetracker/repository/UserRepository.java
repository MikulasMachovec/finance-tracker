package org.example.financetracker.repository;

import org.example.financetracker.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Long> {

    Optional<UserEntity> findByEmail(String username);

    boolean existsByEmail(String email);
    boolean existsByEmailAndUserIdNot(String username, Long userId);
}
