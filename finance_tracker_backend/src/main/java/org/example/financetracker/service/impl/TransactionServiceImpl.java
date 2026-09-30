package org.example.financetracker.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.financetracker.dto.transaction.TransactionRequest;
import org.example.financetracker.dto.transaction.TransactionResponse;
import org.example.financetracker.entity.CategoryEntity;
import org.example.financetracker.entity.TransactionEntity;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.enums.TransactionType;
import org.example.financetracker.exception.ResourceNotFoundException;
import org.example.financetracker.mapper.TransactionMapper;
import org.example.financetracker.repository.CategoryRepository;
import org.example.financetracker.repository.TransactionRepository;
import org.example.financetracker.service.interfaces.AuthenticationService;
import org.example.financetracker.service.interfaces.TransactionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;
    private final TransactionMapper transactionMapper;
    private final AuthenticationService authenticationService;

//    Helper functions
    private CategoryEntity getCategory(
            Long categoryId,
            UserEntity owner
    ) {
        return categoryRepository
                .findByCategoryIdAndOwner(categoryId, owner)
                .orElseThrow(() ->
                    new ResourceNotFoundException("Category")
                );
    }

    private TransactionEntity getTransaction(
            Long transactionId,
            UserEntity owner
    ) {
        return transactionRepository
                .findByTransactionIdAndOwner(transactionId, owner)
                .orElseThrow(() ->
                new ResourceNotFoundException("Transaction"));
    }

    @Override
    public List<TransactionResponse> getAllTransactions() {
        UserEntity owner = authenticationService.getCurrentUser();

        return transactionRepository
                .findByOwner(owner)
                .stream()
                .map(transactionMapper::toResponse)
                .toList();
    }

    @Override
    public TransactionResponse getTransactionById(Long transactionId) {

        UserEntity owner = authenticationService.getCurrentUser();

        TransactionEntity transaction =
                getTransaction(transactionId, owner);

        return transactionMapper.toResponse(transaction);
    }

    @Override
    public TransactionResponse createTransaction(TransactionRequest transactionRequest) {

        UserEntity owner = authenticationService.getCurrentUser();

        TransactionEntity transaction = transactionMapper.toEntity(transactionRequest);
        transaction.setOwner(owner);
//        Check if added expense has category
        if (transactionRequest.getType() == TransactionType.EXPENSE){
            if (transactionRequest.getCategoryId() == null){
                throw new IllegalArgumentException(
                        "Expense transaction must have a category."
                );
            }

            CategoryEntity category = getCategory(transactionRequest.getCategoryId(), owner);

            transaction.setCategory(category);

        } else {
//            Income doesn't have to have category
            transaction.setCategory(null);
        }

        TransactionEntity newTransaction = transactionRepository.save(transaction);
        return transactionMapper.toResponse(newTransaction);
    }

    @Override
    public TransactionResponse updateTransaction(Long transactionId, TransactionRequest transactionRequest) {

        UserEntity owner = authenticationService.getCurrentUser();

        TransactionEntity transaction =
                getTransaction(transactionId, owner);

        CategoryEntity category =
                getCategory(transactionRequest.getCategoryId(), owner);

        transactionMapper.updateEntity(transactionRequest, transaction);
        transaction.setCategory(category);

        TransactionEntity updatedTransaction =
                transactionRepository.save(transaction);

        return transactionMapper.toResponse(updatedTransaction);
    }

    @Override
    public void deleteTransaction(Long transactionId) {
        UserEntity owner = authenticationService.getCurrentUser();
        TransactionEntity transaction = getTransaction(transactionId, owner);

        transactionRepository.delete(transaction);
    }
}
