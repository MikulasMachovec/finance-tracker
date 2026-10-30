package org.example.financetracker.TransactionManagment;

import org.example.financetracker.dto.transaction.TransactionRequest;
import org.example.financetracker.dto.transaction.TransactionResponse;
import org.example.financetracker.entity.TransactionEntity;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.enums.TransactionType;
import org.example.financetracker.mapper.TransactionMapper;
import org.example.financetracker.repository.CategoryRepository;
import org.example.financetracker.repository.TransactionRepository;
import org.example.financetracker.service.impl.TransactionServiceImpl;
import org.example.financetracker.service.interfaces.AuthenticationService;
import org.example.financetracker.service.interfaces.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TransactionServiceCreateTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private TransactionMapper transactionMapper;

    @Mock
    private AuthenticationService authenticationService;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    private UserEntity user;
    private TransactionEntity transaction;

    @BeforeEach
    void setUp() {
        user = mock(UserEntity.class);
        transaction = new TransactionEntity();

        when(authenticationService.getCurrentUser()).thenReturn(user);
    }

    @Test
    void shouldCreateIncomeTransactionWithoutCategory() {
//        Arrange
        TransactionRequest request = new TransactionRequest();
        request.setTitle("Monthly salary");
        request.setAmount(new BigDecimal("2500.00"));
        request.setType(TransactionType.INCOME);
        request.setTransactionDate(LocalDate.now());
        request.setCategoryId(null);

        TransactionResponse expectedResponse = mock(TransactionResponse.class);

        when(transactionMapper.toEntity(request)).thenReturn(transaction);
        when(transactionRepository.save(transaction)).thenReturn(transaction);
        when(transactionMapper.toResponse(transaction)).thenReturn(expectedResponse);

//        Act
        TransactionResponse result = transactionService.createTransaction(request);

//        Assert
        assertEquals(expectedResponse, result);
        assertEquals(user, transaction.getOwner());
        assertNull(transaction.getCategory());

        verify(transactionRepository).save(transaction);
        verify(categoryRepository, never())
                .findByCategoryIdAndOwner(any(), any());

    }

    @Test
    void shouldRejectExpenseWithoutCategory() {
        TransactionRequest request = new TransactionRequest();
        request.setTitle("Groceries");
        request.setAmount(new BigDecimal("25.50"));
        request.setType(TransactionType.EXPENSE);
        request.setTransactionDate(LocalDate.now());
        request.setCategoryId(null);

        when(transactionMapper.toEntity(request))
                .thenReturn(transaction);

        assertThrows(IllegalArgumentException.class,
                () -> transactionService.createTransaction(request));

        verify(transactionRepository, never())
                .save(any(TransactionEntity.class));
    }

    @Test
    void shouldPreserveDecimalAmountWhenCreatingTransaction() {
//        Arrange
        BigDecimal amount = new BigDecimal("25.50");

        TransactionRequest request = new TransactionRequest();
        request.setTitle("Lunch");
        request.setAmount(amount);
        request.setType(TransactionType.INCOME);
        request.setTransactionDate(LocalDate.now());

        when(transactionMapper.toEntity(request)).thenAnswer(invocation -> {
            TransactionEntity entity = new TransactionEntity();
            entity.setAmount(amount);
            return entity;
        });

        when(transactionRepository.save(any(TransactionEntity.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        when(transactionMapper.toResponse(any(TransactionEntity.class)))
                .thenReturn(mock(TransactionResponse.class));

//        Act
        transactionService.createTransaction(request);

//        Assert
        ArgumentCaptor<TransactionEntity> captor =
                ArgumentCaptor.forClass(TransactionEntity.class);

        verify(transactionRepository).save(captor.capture());

        assertEquals(0,
                new BigDecimal("25.50").compareTo(captor.getValue().getAmount()));
    }

    @Test
    void shouldPreserveSmallDecimalAmountWhenCreatingTransaction() {
        // Arrange
        BigDecimal amount = new BigDecimal("0.10");

        TransactionRequest request = new TransactionRequest();
        request.setTitle("Small transaction");
        request.setAmount(amount);
        request.setType(TransactionType.INCOME);
        request.setTransactionDate(LocalDate.now());

        when(transactionMapper.toEntity(request)).thenAnswer(invocation -> {
            TransactionEntity entity = new TransactionEntity();
            entity.setAmount(request.getAmount());
            return entity;
        });

        when(transactionRepository.save(any(TransactionEntity.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        when(transactionMapper.toResponse(any(TransactionEntity.class)))
                .thenReturn(mock(TransactionResponse.class));

        // Act
        transactionService.createTransaction(request);

        // Assert
        ArgumentCaptor<TransactionEntity> captor =
                ArgumentCaptor.forClass(TransactionEntity.class);

        verify(transactionRepository).save(captor.capture());

        assertEquals(0,
                new BigDecimal("0.10").compareTo(captor.getValue().getAmount()));
    }

}
