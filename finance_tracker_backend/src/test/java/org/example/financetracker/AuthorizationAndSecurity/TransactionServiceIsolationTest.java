package org.example.financetracker.AuthorizationAndSecurity;

import org.example.financetracker.dto.transaction.TransactionRequest;
import org.example.financetracker.dto.transaction.TransactionResponse;
import org.example.financetracker.entity.TransactionEntity;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.enums.TransactionType;
import org.example.financetracker.exception.ResourceNotFoundException;
import org.example.financetracker.mapper.TransactionMapper;
import org.example.financetracker.repository.CategoryRepository;
import org.example.financetracker.repository.TransactionRepository;
import org.example.financetracker.service.impl.TransactionServiceImpl;
import org.example.financetracker.service.interfaces.AuthenticationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TransactionServiceIsolationTest {

    @Mock
    TransactionRepository transactionRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private TransactionMapper transactionMapper;

    @Mock
    private AuthenticationService authenticationService;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    private UserEntity userA;
    private UserEntity userB;

    @BeforeEach
    void setUp() {
        userA = mock(UserEntity.class);
        userB = mock(UserEntity.class);

        when(authenticationService.getCurrentUser())
                .thenReturn(userA);
    }

    @Test
    void shouldReturnOnlyTransactionsBelongingToAuthenticatedUser(){
//        Arrange

//        Create a transaction belonging to User A
        TransactionEntity transactionA = mock(TransactionEntity.class);
        TransactionResponse responseA = mock(TransactionResponse.class);

//        The repository returns transaction owned by User A
        when(transactionRepository.findByOwner(userA))
                .thenReturn(List.of(transactionA));

//        Convert the entity to its response DTO
        when(transactionMapper.toResponse(transactionA))
                .thenReturn(responseA);

//        Act: retrieve transactions
        List<TransactionResponse> result =
                transactionService.getAllTransactions();

//        Assert: only User A's transaction is returned
        assertEquals(1, result.size());
        assertEquals(responseA, result.get(0));

//        Verify that the repository was queried using User A
        verify(transactionRepository).findByOwner(userA);

//        Verify that no unscoped query retrieved every transaction
        verify(transactionRepository, never()).findAll();
    }

    @Test
    void shouldNotAllowUserAToRetrieveUserBTransaction(){
//        Arrange
        Long transactionBId = 200L;


//        User B's transaction is not found for User A
        when(transactionRepository
                .findByTransactionIdAndOwner(transactionBId, userA))
                .thenReturn(Optional.empty());

//        Act + Assert
        assertThrows(
                ResourceNotFoundException.class,
                () -> transactionService.getTransactionById(transactionBId)
        );

//        Verify that the ownership-scoped lookup was used
        verify(transactionRepository)
                .findByTransactionIdAndOwner(transactionBId, userA);

//        No transaction should be mapped into response
        verify(transactionMapper, never()).toResponse(any(TransactionEntity.class));
    }

    @Test
    void shouldNotAllowUSerAToDeleteUserBTransaction(){
//        Arrange
        Long transactionBId = 200L;

        when(transactionRepository
                .findByTransactionIdAndOwner(transactionBId, userA))
                .thenReturn(Optional.empty());

//        Act + Assert
        assertThrows(
                ResourceNotFoundException.class,
                () -> transactionService.deleteTransaction(transactionBId)
        );

//        Verify the ownership check was performed
        verify(transactionRepository)
                .findByTransactionIdAndOwner(transactionBId, userA);

        // User B's transaction must never be deleted
        verify(transactionRepository, never())
                .delete(any(TransactionEntity.class));
    }

    @Test
    void shouldNotAllowUSerAToUpdateUserBTransaction(){
//        Arrange
        Long transactionBId = 200L;
        TransactionRequest requestA = mock(TransactionRequest.class);

        when(transactionRepository
                .findByTransactionIdAndOwner(transactionBId, userA))
                .thenReturn(Optional.empty());

//        Act + Assert
        assertThrows(
                ResourceNotFoundException.class,
                () -> transactionService.updateTransaction(transactionBId, requestA)
        );

//        Verify the ownership check was performed
        verify(transactionRepository)
                .findByTransactionIdAndOwner(transactionBId, userA);

        // Verify that no update or save occurred
        verify(transactionMapper, never())
                .updateEntity(any(TransactionRequest.class),
                        any(TransactionEntity.class));

        verify(transactionRepository, never())
                .save(any(TransactionEntity.class));
    }

    @Test
    void shouldNotAllowTransactionToUseAnotherUsersCategory(){
//        Arrange
        Long categoryBId = 200L;
        TransactionRequest request = mock(TransactionRequest.class);
        TransactionEntity transaction = mock(TransactionEntity.class);

        when(request.getType()).thenReturn(TransactionType.EXPENSE);
        when(request.getCategoryId()).thenReturn(categoryBId);

        when(transactionMapper.toEntity(request)).thenReturn(transaction);

//        User A cannot find User B's category
        when(categoryRepository.findByCategoryIdAndOwner(categoryBId, userA))
                .thenReturn(Optional.empty());

//        Act + Assert
        assertThrows(
                ResourceNotFoundException.class,
                () -> transactionService.createTransaction(request)
        );

//        Verify that no transaction was saved.
        verify(transactionRepository, never())
                    .save(any(TransactionEntity.class));
    }

    @Test
    void shouldUpdateOwnTransaction(){
//        Arrange
        Long transactionId  = 100L;
        TransactionEntity existingTransaction = new TransactionEntity();
        existingTransaction.setTitle("Old title");
        existingTransaction.setAmount(new BigDecimal("10.00"));
        existingTransaction.setType(TransactionType.INCOME);
        existingTransaction.setTransactionDate(LocalDate.of(2026, 10, 1));
        existingTransaction.setOwner(userA);

        TransactionRequest request = new TransactionRequest();
        request.setTitle("Updated title");
        request.setAmount(new BigDecimal("25.50"));
        request.setType(TransactionType.INCOME);
        request.setTransactionDate(LocalDate.of(2026, 10, 15));

        TransactionResponse expectedResponse = mock(TransactionResponse.class);

        when(transactionRepository.findByTransactionIdAndOwner(transactionId, userA))
                .thenReturn(Optional.of(existingTransaction));

//        Simulate the mapper updating only the requested fields.
        doAnswer(invocation -> {
            TransactionRequest req = invocation.getArgument(0);
            TransactionEntity entity = invocation.getArgument(1);

            entity.setTitle(req.getTitle());
            entity.setAmount(req.getAmount());
            entity.setType(req.getType());
            entity.setTransactionDate(req.getTransactionDate());

            return null;
        }).when(transactionMapper).updateEntity(request, existingTransaction);

        when(transactionRepository.save(existingTransaction))
                .thenReturn(existingTransaction);

        when(transactionMapper.toResponse(existingTransaction))
                .thenReturn(expectedResponse);

//        Act
        TransactionResponse result =
                transactionService.updateTransaction(transactionId, request);
//        Assert
        assertEquals(expectedResponse, result);
        assertEquals("Updated title", existingTransaction.getTitle());
        assertEquals(0, new BigDecimal("25.50")
                .compareTo(existingTransaction.getAmount()));
        assertEquals(LocalDate.of(2026, 10, 15),
                existingTransaction.getTransactionDate());

//        Owner must remain unchanged.
        assertEquals(userA, existingTransaction.getOwner());

        verify(transactionRepository).save(existingTransaction);
    }

    @Test
    void shouldDeleteOwnTransaction(){
//        Arrange
        Long transactionId  = 100L;
        TransactionEntity transaction = new TransactionEntity();
        transaction.setTransactionId(transactionId);
        transaction.setOwner(userA);

        when(transactionRepository.findByTransactionIdAndOwner(transactionId, userA))
                .thenReturn(Optional.of(transaction));

//        Act + Assert
        transactionService.deleteTransaction(transactionId);

        verify(transactionRepository)
                .findByTransactionIdAndOwner(transactionId, userA);
        verify(transactionRepository).delete(transaction);
    }

    @Test
    void shouldThrowExceptionWhenTransactionDoesNotExist(){
//        Arrange
        Long transactionId  = 999L;

        when(transactionRepository.findByTransactionIdAndOwner(transactionId, userA))
                .thenReturn(Optional.empty());

//        Act + Assert
        assertThrows(
                ResourceNotFoundException.class,
                () -> transactionService.getTransactionById(transactionId)
        );

        verify(transactionRepository).findByTransactionIdAndOwner(transactionId, userA);
        verify(transactionMapper, never()).toResponse(any());
    }


}
