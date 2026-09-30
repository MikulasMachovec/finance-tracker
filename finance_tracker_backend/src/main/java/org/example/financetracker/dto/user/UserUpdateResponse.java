package org.example.financetracker.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserUpdateResponse {

    @NotBlank(message = "First name cannot be empty.")
    String firstName;

    @NotBlank(message = "Last name cannot be empty.")
    String lastName;

    @NotBlank(message = "Email cannot be empty.")
    @Email(message = "Invalid email address.")
    String email;
}
