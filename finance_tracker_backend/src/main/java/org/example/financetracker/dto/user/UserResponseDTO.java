package org.example.financetracker.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class UserResponseDTO {

    private Long userId;

    private String firstName;

    private String lastName;

    private String email;

    private LocalDate createdAt;
}
