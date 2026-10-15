package org.example.financetracker.service.impl;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.example.financetracker.dto.user.UpdatePasswordRequest;
import org.example.financetracker.dto.user.UserResponseDTO;
import org.example.financetracker.dto.user.UserUpdateResponse;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.exception.EmailAlreadyExistsException;
import org.example.financetracker.mapper.UserMapper;
import org.example.financetracker.repository.UserRepository;
import org.example.financetracker.service.interfaces.AuthenticationService;
import org.example.financetracker.service.interfaces.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AuthenticationService authenticationService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponseDTO getUserById(Long userId) {
        UserEntity user = authenticationService.getCurrentUser();
        return userMapper.toResponse(user);

    }

    @Override
    public UserResponseDTO updateProfile(Long userId, UserUpdateResponse request) {
        UserEntity user = authenticationService.getCurrentUser();
//      normalization of email
        String email = user.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmailAndUserIdNot(
                email,
                userId
        )){
            throw new EmailAlreadyExistsException();
        }

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

//      TODO If mail change send confirm email address email
        user.setEmail(request.getEmail());

        UserEntity userUpdated = userRepository.save(user);

        return userMapper.toResponse(userUpdated);
    }

    @Override
    public void updatePassword(UpdatePasswordRequest request) {
        UserEntity user = authenticationService.getCurrentUser();

        if (!passwordEncoder.matches(
                request.getOldPassword(),
                user.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

    }
}
