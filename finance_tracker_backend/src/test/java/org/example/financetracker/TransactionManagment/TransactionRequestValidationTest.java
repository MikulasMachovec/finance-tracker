package org.example.financetracker.TransactionManagment;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.example.financetracker.dto.transaction.TransactionRequest;
import org.example.financetracker.enums.TransactionType;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

public class TransactionRequestValidationTest {

    private static ValidatorFactory factory;
    private static Validator validator;

    @BeforeAll
    static void setUp() {
        factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @AfterAll
    static void tearDown() {
        factory.close();
    }

    private TransactionRequest validRequest() {
        TransactionRequest request = new TransactionRequest();
        request.setTitle("Test Title");
        request.setAmount(new BigDecimal("25.50"));
        request.setType(TransactionType.EXPENSE);
        request.setTransactionDate(LocalDate.now());
        request.setCategoryId(1L);
        return request;
    }

    @Test
    void shouldRejectBlankTitle() {
        TransactionRequest request = validRequest();
        request.setTitle("   ");
        assertTrue(validator.validate(request).stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("title")));
    }

    @Test
    void shouldRejectMissingAmount() {
        TransactionRequest request = validRequest();
        request.setAmount(null);

        assertTrue(validator.validate(request).stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("amount")));
    }

    @Test
    void shouldRejectMissingType() {
        TransactionRequest request = validRequest();
        request.setType(null);

        assertTrue(validator.validate(request).stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("type")));
    }

    @Test
    void shouldRejectMissingTransactionDate() {
        TransactionRequest request = validRequest();
        request.setTransactionDate(null);

        assertTrue(validator.validate(request).stream()
                .anyMatch(v -> v.getPropertyPath().toString()
                        .equals("transactionDate")));
    }

    @Test
    void shouldAcceptValidRequest() {
        TransactionRequest request = validRequest();

        assertTrue(validator.validate(request).isEmpty());
    }

    @Test
    void shouldRejectZeroAmount() {
        TransactionRequest request = validRequest();
        request.setAmount(new BigDecimal("0.00"));

        assertTrue(validator.validate(request).stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("amount")));
    }

    @Test
    void shouldRejectNegativeAmount() {
        TransactionRequest request = validRequest();
        request.setAmount(new BigDecimal("-10.00"));

        assertTrue(validator.validate(request).stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("amount")));
    }

    @Test
    void shouldRejectAmountBelowMinimum() {
        TransactionRequest request = validRequest();
        request.setAmount(new BigDecimal("0.001"));

        assertTrue(validator.validate(request).stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("amount")));
    }

    @Test
    void shouldAcceptMinimumAmount() {
        TransactionRequest request = validRequest();
        request.setAmount(new BigDecimal("0.01"));

        assertTrue(validator.validate(request).isEmpty());
    }

    @Test
    void shouldAcceptPositiveAmount() {
        TransactionRequest request = validRequest();
        request.setAmount(new BigDecimal("125.75"));

        assertTrue(validator.validate(request).isEmpty());
    }
}
