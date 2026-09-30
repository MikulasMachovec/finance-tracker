package org.example.financetracker.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.exception.ResourceNotFoundException;
import org.example.financetracker.repository.UserRepository;
import org.example.financetracker.security.CustomUserPrincipal;
import org.example.financetracker.service.interfaces.AuthenticationService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;

    @Override
    public UserEntity getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        CustomUserPrincipal principal =
                (CustomUserPrincipal) authentication.getPrincipal();

        return userRepository.findById(principal.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User"));
    }
}
