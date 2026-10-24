package org.example.financetracker.dto.user;

public record UserPreferencesDTO(
        String dateFormat,
        String currency
) {}
