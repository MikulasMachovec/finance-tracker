package org.example.financetracker.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.financetracker.dto.user.UserResponseDTO;
import org.example.financetracker.dto.user.UserUpdateResponse;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.exception.EmailAlreadyExistsException;
import org.example.financetracker.exception.ResourceNotFoundException;
import org.example.financetracker.mapper.UserMapper;
import org.example.financetracker.repository.UserRepository;
import org.example.financetracker.service.interfaces.UserService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserResponseDTO getUserById(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User")
                );
        return userMapper.toResponse(user);

    }

    @Override
    public UserResponseDTO updateProfile(Long userId, UserUpdateResponse request) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User"));
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
}
