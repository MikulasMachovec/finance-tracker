package org.example.financetracker.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.financetracker.dto.user.UserResponseDTO;
import org.example.financetracker.dto.user.UserUpdateResponse;
import org.example.financetracker.security.CustomUserPrincipal;
import org.example.financetracker.service.interfaces.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public UserResponseDTO getCurrentUser(
            @AuthenticationPrincipal CustomUserPrincipal principal
    ){
        return userService.getUserById(
                principal.getUserId()
        );
    }

    @PutMapping("/updateProfile")
    public UserResponseDTO updateProfile(
            @AuthenticationPrincipal CustomUserPrincipal principal,
            @Valid @RequestBody UserUpdateResponse request
            ) {
        return userService.updateProfile(
                principal.getUserId(),
                request
        );
    }
}
