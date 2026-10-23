package org.example.financetracker.service.interfaces;

import jakarta.validation.Valid;
import org.example.financetracker.dto.user.UpdatePasswordRequest;
import org.example.financetracker.dto.user.UserPreferencesDTO;
import org.example.financetracker.dto.user.UserResponseDTO;
import org.example.financetracker.dto.user.UserUpdateResponse;

public interface UserService {

    UserResponseDTO getUserById(Long userId);

    UserResponseDTO updateProfile(Long userId, UserUpdateResponse request);

    void updatePassword(UpdatePasswordRequest request);

    void deleteUserAccount();

    UserPreferencesDTO getPreferences();

    UserPreferencesDTO updatePreferences(UserPreferencesDTO request);
}
