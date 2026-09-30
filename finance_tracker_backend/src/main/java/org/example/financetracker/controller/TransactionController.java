package org.example.financetracker.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.financetracker.dto.transaction.TransactionRequest;
import org.example.financetracker.dto.transaction.TransactionResponse;
import org.example.financetracker.enums.TransactionType;
import org.example.financetracker.service.interfaces.TransactionService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping
    public List<TransactionResponse> getAllTransactions(
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) TransactionType transactionType
    ) {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/{transactionId}")
    public TransactionResponse getTransactionById(
            @PathVariable Long transactionId) {
        return transactionService.getTransactionById(transactionId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TransactionResponse createTransaction
            (@Valid @RequestBody TransactionRequest transactionRequest) {
        return transactionService.createTransaction(transactionRequest);
    }

    @PutMapping("/{transactionId}")
    public TransactionResponse updateTransaction(
            @PathVariable Long transactionId,
            @Valid @RequestBody TransactionRequest transactionRequest){
        return transactionService.updateTransaction(
                transactionId,
                transactionRequest
        );
    }

    @DeleteMapping("/{transactionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTransaction(
            @PathVariable Long transactionId
    ){
        transactionService.deleteTransaction(transactionId);
    }

}
