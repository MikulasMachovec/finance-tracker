package org.example.financetracker.mapper;

import org.example.financetracker.dto.transaction.TransactionRequest;
import org.example.financetracker.dto.transaction.TransactionResponse;
import org.example.financetracker.entity.TransactionEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    @Mapping(target = "transactionId", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    TransactionEntity toEntity(TransactionRequest request);

    @Mapping(source = "category.categoryId", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    @Mapping(source = "category.color", target = "categoryColor")
    TransactionResponse toResponse(TransactionEntity entity);


    @Mapping(target = "transactionId", ignore = true)
    @Mapping(target = "owner", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntity(
            TransactionRequest request,
            @MappingTarget TransactionEntity entity);

}
