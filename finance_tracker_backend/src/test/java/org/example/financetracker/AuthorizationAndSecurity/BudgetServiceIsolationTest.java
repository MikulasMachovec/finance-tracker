package org.example.financetracker.AuthorizationAndSecurity;

import org.example.financetracker.dto.budget.BudgetRequest;
import org.example.financetracker.dto.budget.BudgetResponse;
import org.example.financetracker.entity.BudgetEntity;
import org.example.financetracker.entity.CategoryEntity;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.exception.ResourceNotFoundException;
import org.example.financetracker.mapper.BudgetMapper;
import org.example.financetracker.repository.BudgetRepository;
import org.example.financetracker.repository.CategoryRepository;
import org.example.financetracker.repository.TransactionRepository;
import org.example.financetracker.service.impl.BudgetServiceImpl;
import org.example.financetracker.service.interfaces.AuthenticationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BudgetServiceIsolationTest {
    @Mock
    private BudgetRepository budgetRepository;

    @Mock
    private BudgetMapper budgetMapper;

    @Mock
    private AuthenticationService authenticationService;

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private BudgetServiceImpl budgetService;

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
    void shouldReturnOnlyBudgetBelongingToAuthenticatedUser() {
//        Arrange
        BudgetEntity budgetA = mock(BudgetEntity.class);
        BudgetResponse responseA = mock(BudgetResponse.class);

        when(budgetRepository.findByOwnerAndYearAndMonth(
                eq(userA),anyInt(),anyInt()
                )).thenReturn(List.of(budgetA));

        when(budgetA.getYear()).thenReturn(2026);
        when(budgetA.getMonth()).thenReturn(10);

        when(budgetMapper.toResponse(budgetA))
                .thenReturn(responseA);

        when(budgetA.getOwner()).thenReturn(userA);
        when(budgetA.getCategory()).thenReturn(
                mock(CategoryEntity.class)
        );

        when(transactionRepository.sumAmountByCategoryAndRangeDate(
                eq(userA),
                any(),
                any(),
                any(),
                any()
        )).thenReturn(BigDecimal.ZERO);

//        Act
        List<BudgetResponse> result =
                budgetService.getAllBudgets();

//        Assert
        assertEquals(1,  result.size());
        assertEquals(responseA, result.get(0));

        verify(budgetRepository).findByOwnerAndYearAndMonth(
                eq(userA),anyInt(),anyInt());

    }

    @Test
    void shouldNotAllowUserToRetrieveAnotherUserBudget() {
//        Arrange
        Long budgetBId = 200L;

//        The repository cannot find this budget under User A
        when(budgetRepository.findByBudgetIdAndOwner(budgetBId, userA))
                .thenReturn(Optional.empty());

//        Act + Assert
        assertThrows(
                ResourceNotFoundException.class,
                () -> budgetService.getBudgetById(budgetBId)
        );

//        Verify that budget response mapper was never caller
        verify(budgetMapper, never()).toResponse(any(BudgetEntity.class));
    }

    @Test
    void shouldNotAllowUserToUpdateAnotherUserBudget() {
//        Arrange
        Long budgetBId = 200L;
        BudgetRequest request = mock(BudgetRequest.class);

//        User A cannot find User B's budget
        when(categoryRepository.findByCategoryIdAndOwner(
                anyLong(), eq(userA)
        )).thenReturn(Optional.of(mock(CategoryEntity.class)));

        when(budgetRepository.findByBudgetIdAndOwner(budgetBId, userA))
                .thenReturn(Optional.empty());

//        Act + Assert
        assertThrows(
                ResourceNotFoundException.class,
                () -> budgetService.updateBudget(budgetBId, request)
        );

//        Verify that nothing was updated or saver
        verify(budgetMapper, never()).updateEntity(
                any(BudgetRequest.class),
                any(BudgetEntity.class)
        );
        verify(budgetRepository, never()).save(any(BudgetEntity.class));
    }

    @Test
    void shouldNotAllowUserToDeleteAnotherUserBudget() {
//        Arrange
        Long budgetBId = 200L;

        when(budgetRepository.findByBudgetIdAndOwner(budgetBId, userA))
                .thenReturn(Optional.empty());

//        Act + Assert
        assertThrows(
                ResourceNotFoundException.class,
                () -> budgetService.deleteBudget(budgetBId)
        );

//        Verify that no budget was deleted
        verify(budgetRepository, never()).delete(any(BudgetEntity.class));
    }


}
