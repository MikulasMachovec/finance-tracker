package org.example.financetracker.Category;

import org.example.financetracker.dto.cateogry.CategoryRequest;
import org.example.financetracker.dto.cateogry.CategoryResponse;
import org.example.financetracker.dto.transaction.TransactionRequest;
import org.example.financetracker.entity.BudgetEntity;
import org.example.financetracker.entity.CategoryEntity;
import org.example.financetracker.entity.TransactionEntity;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.enums.TransactionType;
import org.example.financetracker.mapper.CategoryMapper;
import org.example.financetracker.mapper.TransactionMapper;
import org.example.financetracker.repository.BudgetRepository;
import org.example.financetracker.repository.CategoryRepository;
import org.example.financetracker.repository.TransactionRepository;
import org.example.financetracker.service.impl.CategoryServiceImpl;
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
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {

    @Mock
    private CategoryMapper categoryMapper;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private AuthenticationService authenticationService;

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private TransactionMapper transactionMapper;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    @Mock
    private BudgetRepository  budgetRepository;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    private UserEntity userA;

    @BeforeEach
    void setUp() {
        userA = new UserEntity();
        userA.setUserId(1L);

        when(authenticationService.getCurrentUser()).thenReturn(userA);
    }

    @Test
    void shouldCreateCategoryForAuthenticatedUser() {
//        Arrange
        CategoryRequest request = new CategoryRequest();
        request.setName("Test");
        request.setColor("#10B981");

        CategoryEntity category = new CategoryEntity();
        category.setName("Test");
        category.setColor("#10B981");

        CategoryResponse expectedResponse = mock(CategoryResponse.class);

        when(categoryMapper.toEntity(request)).thenReturn(category);
        when(categoryRepository.save(category)).thenReturn(category);
        when(categoryMapper.toResponse(category)).thenReturn(expectedResponse);

//        Act
        CategoryResponse result = categoryService.createCategory(request);

//        Assert
        assertEquals(expectedResponse, result);
        assertEquals(userA, category.getOwner());

        verify(authenticationService).getCurrentUser();
        verify(categoryMapper).toEntity(request);
        verify(categoryRepository).save(category);
        verify(categoryMapper).toResponse(category);
    }

    @Test
    void shouldUpdateOwnCategory() {
//        Arrange
        Long categoryId = 10L;

        CategoryRequest request = new CategoryRequest();
        request.setName("Groceries");
        request.setColor("#22C55E");

        CategoryEntity category = new CategoryEntity();
        category.setCategoryId(categoryId);
        category.setName("Food");
        category.setColor("#10B981");
        category.setOwner(userA);

        CategoryResponse expectedResponse = mock(CategoryResponse.class);

        when(categoryRepository.findByCategoryIdAndOwner(categoryId, userA))
                .thenReturn(Optional.of(category));

        doAnswer(invocation -> {
            CategoryRequest req = invocation.getArgument(0);
            CategoryEntity entity = invocation.getArgument(1);

            entity.setName(req.getName());
            entity.setColor(req.getColor());
            return null;
        }).when(categoryMapper).updateEntity(request, category);

        when(categoryRepository.save(category)).thenReturn(category);
        when(categoryMapper.toResponse(category)).thenReturn(expectedResponse);

//        Act
        CategoryResponse result = categoryService.updateCategory(categoryId, request);

//        Assert
        assertEquals(expectedResponse, result);
        assertEquals("Groceries", category.getName());
        assertEquals("#22C55E", category.getColor());
        assertEquals(userA, category.getOwner());

        verify(categoryRepository).save(category);

    }

    @Test
    void shouldReassignTransactionsAndDeleteBudgetsWhenDeletingCategory() {
//        Arrange
        Long categoryId = 10L;
        Long uncategorizedId = 99L;

        CategoryEntity category = new CategoryEntity();
        category.setCategoryId(categoryId);
        category.setName("Food");
        category.setOwner(userA);

        CategoryEntity uncategorized = new CategoryEntity();
        uncategorized.setCategoryId(uncategorizedId);
        uncategorized.setName("Uncategorized");
        uncategorized.setOwner(userA);

        when(categoryRepository.findByCategoryIdAndOwner(categoryId, userA))
                .thenReturn(Optional.of(category));

        when(categoryRepository.findByOwnerAndNameIgnoreCase(userA, "Uncategorized"))
                .thenReturn(Optional.of(uncategorized));

//        Act
        categoryService.deleteCategory(categoryId);

//        Assert
        verify(transactionRepository).reassignCategory(
                categoryId,
                uncategorizedId,
                userA.getUserId()
        );

        verify(budgetRepository).deleteByCategory_CategoryIdAndOwner(categoryId, userA);

        verify(categoryRepository).delete(category);
    }

    @Test
    void shouldCreateUncategorizedCategoryWhenDeletingCategory() {
//        Arrange
        Long categoryId = 10L;

        CategoryEntity category = new CategoryEntity();
        category.setCategoryId(categoryId);
        category.setName("Food");
        category.setOwner(userA);

        when(categoryRepository.findByCategoryIdAndOwner(categoryId, userA))
                .thenReturn(Optional.of(category));

        when(categoryRepository.findByOwnerAndNameIgnoreCase(userA, "Uncategorized"))
                .thenReturn(Optional.empty());

        when(categoryRepository.save(any(CategoryEntity.class)))
                .thenAnswer(invocation -> {
                    CategoryEntity saved = invocation.getArgument(0);
                    saved.setCategoryId(99L);
                    return saved;
                });

//        Act
        categoryService.deleteCategory(categoryId);

//        Assert
        ArgumentCaptor<CategoryEntity> captor =
                ArgumentCaptor.forClass(CategoryEntity.class);

        verify(categoryRepository).save(captor.capture());

        CategoryEntity createdCategory = captor.getValue();

        assertEquals("Uncategorized", createdCategory.getName());
        assertEquals("#999999", createdCategory.getColor());
        assertEquals(userA, createdCategory.getOwner());

        verify(transactionRepository).reassignCategory(
                categoryId, 99L, userA.getUserId()
        );

        verify(budgetRepository)
                .deleteByCategory_CategoryIdAndOwner(categoryId, userA);

        verify(categoryRepository).delete(category);
    }

    @Test
    void shouldNotAllowDeletingUncategorizedCategory() {
        // Arrange
        Long categoryId = 99L;

        CategoryEntity uncategorized = new CategoryEntity();
        uncategorized.setCategoryId(categoryId);
        uncategorized.setName("Uncategorized");
        uncategorized.setOwner(userA);

        when(categoryRepository.findByCategoryIdAndOwner(categoryId, userA))
                .thenReturn(Optional.of(uncategorized));

        when(categoryRepository.findByOwnerAndNameIgnoreCase(userA, "Uncategorized"))
                .thenReturn(Optional.of(uncategorized));

        // Act & Assert
        assertThrows(
                IllegalArgumentException.class,
                () -> categoryService.deleteCategory(categoryId)
        );

        verify(transactionRepository, never()).reassignCategory(any(), any(), any());
        verify(budgetRepository, never())
                .deleteByCategory_CategoryIdAndOwner(any(), any());
        verify(categoryRepository, never()).delete(any());
    }

    @Test
    void shouldNotAllowUncategorizedWhenCreatingExpense() {
        // Arrange
        Long categoryId = 10L;

        TransactionRequest request = new TransactionRequest();
        request.setTitle("Dinner");
        request.setAmount(new BigDecimal("25.00"));
        request.setType(TransactionType.EXPENSE);
        request.setTransactionDate(LocalDate.now());
        request.setCategoryId(categoryId);

        TransactionEntity transaction = new TransactionEntity();

        CategoryEntity uncategorized = new CategoryEntity();
        uncategorized.setCategoryId(categoryId);
        uncategorized.setName("Uncategorized");
        uncategorized.setOwner(userA);

        when(transactionMapper.toEntity(request)).thenReturn(transaction);

        when(categoryRepository.findByCategoryIdAndOwner(categoryId, userA))
                .thenReturn(Optional.of(uncategorized));

        // Act & Assert
        assertThrows(
                IllegalArgumentException.class,
                () -> transactionService.createTransaction(request)
        );

        verify(transactionRepository, never()).save(any());
    }

    @Test
    void shouldNotAllowUncategorizedWhenUpdatingExpense() {
        // Arrange
        Long transactionId = 100L;
        Long categoryId = 10L;

        TransactionRequest request = new TransactionRequest();
        request.setTitle("Updated dinner");
        request.setAmount(new BigDecimal("30.00"));
        request.setType(TransactionType.EXPENSE);
        request.setTransactionDate(LocalDate.now());
        request.setCategoryId(categoryId);

        TransactionEntity existingTransaction = new TransactionEntity();
        existingTransaction.setTransactionId(transactionId);
        existingTransaction.setOwner(userA);

        CategoryEntity uncategorized = new CategoryEntity();
        uncategorized.setCategoryId(categoryId);
        uncategorized.setName("Uncategorized");
        uncategorized.setOwner(userA);

        when(transactionRepository.findByTransactionIdAndOwner(transactionId, userA))
                .thenReturn(Optional.of(existingTransaction));

        when(categoryRepository.findByCategoryIdAndOwner(categoryId, userA))
                .thenReturn(Optional.of(uncategorized));

        // Act & Assert
        assertThrows(
                IllegalArgumentException.class,
                () -> transactionService.updateTransaction(transactionId, request)
        );

        verify(transactionRepository, never()).save(any());
    }

    @Test
    void shouldNotAllowDuplicateCategoryName() {
        // Arrange
        CategoryRequest request = new CategoryRequest();
        request.setName("Food");
        request.setColor("#10B981");

        when(authenticationService.getCurrentUser()).thenReturn(userA);

        when(categoryRepository.existsByOwnerAndNameIgnoreCase(userA, "Food"))
                .thenReturn(true);

        // Act & Assert
        assertThrows(
                IllegalArgumentException.class,
                () -> categoryService.createCategory(request)
        );

        verify(categoryRepository, never()).save(any());
        verify(categoryMapper, never()).toEntity(any());
    }

    @Test
    void shouldNotAllowCategoryNameWithDifferentCapitalization() {
        // Arrange
        CategoryRequest request = new CategoryRequest();
        request.setName("food");
        request.setColor("#10B981");

        when(categoryRepository.existsByOwnerAndNameIgnoreCase(userA, "food"))
                .thenReturn(true);

        // Act & Assert
        assertThrows(
                IllegalArgumentException.class,
                () -> categoryService.createCategory(request)
        );

        verify(categoryRepository, never()).save(any());
    }

    @Test
    void shouldNotAllowCreatingUncategorizedCategory() {
        // Arrange
        CategoryRequest request = new CategoryRequest();
        request.setName("Uncategorized");
        request.setColor("#999999");

        // Act & Assert
        assertThrows(
                IllegalArgumentException.class,
                () -> categoryService.createCategory(request)
        );

        verify(categoryRepository, never()).save(any());
    }

    @Test
    void shouldAllowUpdatingCategoryColorWithoutChangingItsName() {
        // Arrange
        Long categoryId = 10L;

        CategoryRequest request = new CategoryRequest();
        request.setName("Food");
        request.setColor("#22C55E");

        CategoryEntity category = new CategoryEntity();
        category.setCategoryId(categoryId);
        category.setName("Food");
        category.setColor("#10B981");
        category.setOwner(userA);

        CategoryResponse expectedResponse = mock(CategoryResponse.class);

        when(categoryRepository.findByCategoryIdAndOwner(categoryId, userA))
                .thenReturn(Optional.of(category));

        when(categoryRepository.existsByOwnerAndNameIgnoreCaseAndCategoryIdNot(
                userA, "Food", categoryId
        )).thenReturn(false);

        when(categoryRepository.save(category)).thenReturn(category);
        when(categoryMapper.toResponse(category)).thenReturn(expectedResponse);

        doAnswer(invocation -> {
            CategoryRequest req = invocation.getArgument(0);
            CategoryEntity entity = invocation.getArgument(1);

            entity.setName(req.getName());
            entity.setColor(req.getColor());

            return null;
        }).when(categoryMapper).updateEntity(request, category);

        // Act
        CategoryResponse result = categoryService.updateCategory(categoryId, request);

        // Assert
        assertEquals(expectedResponse, result);
        assertEquals("Food", category.getName());
        assertEquals("#22C55E", category.getColor());
        assertNotEquals("#10B981", category.getColor());

        verify(categoryRepository).save(category);
    }

    @Test
    void shouldNotAllowUpdatingCategoryToExistingName() {
        // Arrange
        Long categoryId = 10L;

        CategoryRequest request = new CategoryRequest();
        request.setName("Transport");
        request.setColor("#22C55E");

        CategoryEntity category = new CategoryEntity();
        category.setCategoryId(categoryId);
        category.setName("Food");
        category.setOwner(userA);

        when(categoryRepository.findByCategoryIdAndOwner(categoryId, userA))
                .thenReturn(Optional.of(category));

        when(categoryRepository.existsByOwnerAndNameIgnoreCaseAndCategoryIdNot(
                userA, "Transport", categoryId
        )).thenReturn(true);

        // Act & Assert
        assertThrows(
                IllegalArgumentException.class,
                () -> categoryService.updateCategory(categoryId, request)
        );

        verify(categoryRepository, never()).save(any());
        verify(categoryMapper, never()).updateEntity(any(), any());
    }

    @Test
    void shouldCalculateCategoryTotalsCorrectly() {
        // Arrange
        LocalDate today = LocalDate.now();
        LocalDate firstDay = today.withDayOfMonth(1);

        CategoryEntity category = new CategoryEntity();
        category.setCategoryId(1L);
        category.setOwner(userA);

        TransactionEntity expense1 = new TransactionEntity();
        expense1.setAmount(new BigDecimal("100.00"));
        expense1.setType(TransactionType.EXPENSE);
        expense1.setTransactionDate(firstDay);

        TransactionEntity expense2 = new TransactionEntity();
        expense2.setAmount(new BigDecimal("50.00"));
        expense2.setType(TransactionType.EXPENSE);
        expense2.setTransactionDate(today);

        TransactionEntity income = new TransactionEntity();
        income.setAmount(new BigDecimal("500.00"));
        income.setType(TransactionType.INCOME);
        income.setTransactionDate(today);

        category.setTransactions(List.of(expense1, expense2, income));

        BudgetEntity budget = new BudgetEntity();
        budget.setYear(today.getYear());
        budget.setMonth(today.getMonthValue());
        budget.setLimitAmount(new BigDecimal("300.00"));

        category.setBudgets(List.of(budget));

        CategoryResponse response = new CategoryResponse(
                category.getCategoryId(),
                category.getName(),
                category.getColor(),
                BigDecimal.ZERO,
                BigDecimal.ZERO,
                0L
        );;

        when(categoryRepository.findByCategoryIdAndOwner(1L, userA))
                .thenReturn(Optional.of(category));

        when(categoryMapper.toResponse(category)).thenReturn(response);

        // Act
        CategoryResponse result = categoryService.getCategoryById(1L);

        // Assert
        assertEquals(3L, result.getTransactions());
        assertEquals(0, new BigDecimal("150.00").compareTo(result.getSpent()));
        assertEquals(0, new BigDecimal("300.00").compareTo(result.getBudget()));
    }
}
