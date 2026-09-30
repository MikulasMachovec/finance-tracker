package org.example.financetracker.service.interfaces;

import org.example.financetracker.dto.transaction.TransactionRequest;
import org.example.financetracker.dto.transaction.TransactionResponse;

import java.util.List;

public interface TransactionService {

    List<TransactionResponse> getAllTransactions();

    TransactionResponse getTransactionById(Long transactionId);

    TransactionResponse createTransaction(TransactionRequest transactionRequest);

    TransactionResponse updateTransaction(
            Long transactionId,
            TransactionRequest transactionRequest
    );

    void deleteTransaction(Long transactionId);

}
