package org.example.financetracker.AuthorizationAndSecurity;

import org.example.financetracker.dto.cateogry.CategoryRequest;
import org.example.financetracker.dto.cateogry.CategoryResponse;
import org.example.financetracker.entity.CategoryEntity;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.exception.ResourceNotFoundException;
import org.example.financetracker.mapper.CategoryMapper;
import org.example.financetracker.repository.BudgetRepository;
import org.example.financetracker.repository.CategoryRepository;
import org.example.financetracker.repository.TransactionRepository;
import org.example.financetracker.service.impl.CategoryServiceImpl;
import org.example.financetracker.service.interfaces.AuthenticationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceIsolationTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private CategoryMapper categoryMapper;

    @Mock
    private AuthenticationService authenticationService;

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private BudgetRepository budgetRepository;

    @InjectMocks
    private CategoryServiceImpl categoryService;

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
    void shouldReturnOnlyCategoriesBelongingToAuthenticatedUser() {
//        Arrange
        CategoryEntity categoryA = mock(CategoryEntity.class);
        CategoryResponse responseA = mock(CategoryResponse.class);

        when(categoryRepository.findByOwner(userA))
                .thenReturn(List.of(categoryA));

        when(categoryMapper.toResponse(categoryA))
                .thenReturn(responseA);

//        Act
        List<CategoryResponse> result =
                categoryService.getAllCategories();

//        Assert
        assertEquals(1,  result.size());
        assertEquals(responseA, result.get(0));

        verify(categoryRepository).findByOwner(userA);
        verify(categoryRepository, never()).findAll();
    }

    @Test
    void shouldNotAllowUserAToRetrieveUserBCategory() {
//        Arrange
        Long categoryBId = 200L;

        when(categoryRepository
                .findByCategoryIdAndOwner(categoryBId, userA))
                .thenReturn(Optional.empty());

//        Act + Assert
        assertThrows(
                ResourceNotFoundException.class,
                () -> categoryService.getCategoryById(categoryBId)
        );

//        Verify the lookup checks both category ID and owner
        verify(categoryRepository)
                .findByCategoryIdAndOwner(categoryBId, userA);

//        The category must not be converted into a response
        verify(categoryMapper, never())
                .toResponse(any(CategoryEntity.class));
    }

    @Test
    void shouldNotAllowUserAToUpdateUserBCategory() {
//        Arrange
        Long categoryBId = 200L;
        CategoryRequest categoryRequest = mock(CategoryRequest.class);

        when(categoryRepository
                .findByCategoryIdAndOwner(categoryBId, userA))
                .thenReturn(Optional.empty());

//        Act + Assert
        assertThrows(
                ResourceNotFoundException.class,
                () -> categoryService.updateCategory(categoryBId, categoryRequest)
        );

        // Verify the ownership check
        verify(categoryRepository)
                .findByCategoryIdAndOwner(categoryBId, userA);

        // Verify that no update or save occurred
        verify(categoryMapper, never())
                .updateEntity(any(CategoryRequest.class),
                        any(CategoryEntity.class));

        verify(categoryRepository, never())
                .save(any(CategoryEntity.class));
    }

    @Test
    void shouldNotAllowUserAToDeleteUserBCategory() {
//        Arrange
        Long categoryBId = 200L;

        when(categoryRepository
                .findByCategoryIdAndOwner(categoryBId, userA))
                .thenReturn(Optional.empty());

//      Act + Assert
        assertThrows(
                ResourceNotFoundException.class,
                () -> categoryService.deleteCategory(categoryBId));

//        Verify the ownership check
        verify(categoryRepository)
                .findByCategoryIdAndOwner(categoryBId, userA);

//        Verify that no related data was change
        verify(categoryRepository, never())
                .findByOwnerAndNameIgnoreCase(any(),anyString());

        verify(transactionRepository, never())
                .reassignCategory(anyLong(),anyLong(),anyLong());

        verify(budgetRepository, never())
                .deleteByCategory_CategoryIdAndOwner(
                        anyLong(),
                        any(UserEntity.class)
                );

        verify(categoryRepository, never())
                .delete(any(CategoryEntity.class));
    }
}
