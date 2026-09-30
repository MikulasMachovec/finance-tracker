package org.example.financetracker.mapper;

import org.example.financetracker.dto.cateogry.CategoryRequest;
import org.example.financetracker.dto.cateogry.CategoryResponse;
import org.example.financetracker.entity.CategoryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    @Mapping(target = "categoryId", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "transactions", ignore = true)
    @Mapping(target = "budgets", ignore = true)
    CategoryEntity toEntity(CategoryRequest request);

    @Mapping(target = "transactions", ignore = true)
    @Mapping(target = "spent", ignore = true)
    @Mapping(target = "budget", ignore = true)
    CategoryResponse toResponse(CategoryEntity entity);

    @Mapping(target = "categoryId", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "transactions", ignore = true)
    @Mapping(target = "budgets", ignore = true)
    void updateEntity(CategoryRequest request, @MappingTarget CategoryEntity entity);
}
