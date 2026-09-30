package org.example.financetracker.service.interfaces;

import org.example.financetracker.dto.cateogry.CategoryRequest;
import org.example.financetracker.dto.cateogry.CategoryResponse;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> getAllCategories();

    CategoryResponse getCategoryById(Long categoryId);

    CategoryResponse createCategory(CategoryRequest request);

    CategoryResponse updateCategory(Long categoryId, CategoryRequest request);

    void deleteCategory(Long categoryId);
}
