package org.example.financetracker.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.financetracker.dto.user.UpdatePasswordRequest;
import org.example.financetracker.dto.user.UserPreferencesDTO;
import org.example.financetracker.dto.user.UserResponseDTO;
import org.example.financetracker.dto.user.UserUpdateResponse;
import org.example.financetracker.security.CustomUserPrincipal;
import org.example.financetracker.service.interfaces.UserService;
import org.springframework.http.ResponseEntity;
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

    @PutMapping("/updatePassword")
    public ResponseEntity<Void> updatePassword(
            @Valid @RequestBody UpdatePasswordRequest request
            ){
        userService.updatePassword(
                request
        );

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/deleteAccount")
    public ResponseEntity<Void> deleteAccount(
    ){
        userService.deleteUserAccount();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/preferences")
    public ResponseEntity<UserPreferencesDTO> getPreferences() {
        return ResponseEntity.ok(userService.getPreferences());
    }

    @PutMapping("/preferences")
    public ResponseEntity<UserPreferencesDTO> updatePreferences(
            @RequestBody UserPreferencesDTO request
    ) {
        return ResponseEntity.ok(userService.updatePreferences(request));
    }


}
