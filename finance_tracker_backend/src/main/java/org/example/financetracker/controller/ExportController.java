package org.example.financetracker.controller;

import lombok.RequiredArgsConstructor;
import org.example.financetracker.service.interfaces.ExportDataService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@RestController
@RequestMapping("/export")
@RequiredArgsConstructor
public class ExportController {

    private final ExportDataService exportDataService;

    @GetMapping(value = "/transaction_csv", produces = "text/csv")
    public ResponseEntity<byte[]> exportTransactionsCsv(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate fromDate,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate toDate
    ){
        if ((fromDate == null) != (toDate == null)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Both fromDate and toDate must be provided."
            );
        }

        if (fromDate != null && fromDate.isAfter(toDate)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "fromDate must not be after toDate."
            );
        }

        byte [] csv = exportDataService.exportTransactionsCsv(
                fromDate,
                toDate
        );

        return ResponseEntity.ok()
                .contentType(
                        org.springframework.http.MediaType.parseMediaType(
                                "text/csv; charset=UTF-8"
                        )
                )
                .header(
                        org.springframework.http.HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"transactions.csv\""
                )
                .body(csv);
    }

    @GetMapping(value = "/budget_csv", produces = "text/csv")
    public ResponseEntity<byte[]> exportBudgetsCsv(){
        byte [] csv = exportDataService.exportBudgetsCsv();

        return ResponseEntity.ok()
                .contentType(
                        org.springframework.http.MediaType.parseMediaType(
                                "text/csv; charset=UTF-8"
                        )
                )
                .header(
                        org.springframework.http.HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"budgets.csv\""
                )
                .body(csv);
    }

    @GetMapping(value = "/category_csv", produces = "text/csv")
    public ResponseEntity<byte[]> exportCategoriesCsv(){
        byte [] csv = exportDataService.exportCategoriesCsv();

        return ResponseEntity.ok()
                .contentType(
                        org.springframework.http.MediaType.parseMediaType(
                                "text/csv; charset=UTF-8"
                        )
                )
                .header(
                        org.springframework.http.HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"categories.csv\""
                )
                .body(csv);
    }
}
