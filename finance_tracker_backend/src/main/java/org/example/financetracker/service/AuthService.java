package org.example.financetracker.service;

import lombok.RequiredArgsConstructor;
import org.example.financetracker.dto.auth.LoginRequest;
import org.example.financetracker.dto.auth.RegisterRequest;
import org.example.financetracker.dto.auth.LoginResponse;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.exception.EmailAlreadyExistsException;
import org.example.financetracker.exception.InvalidCredentialsException;
import org.example.financetracker.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public void register(RegisterRequest request) {
        if(userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException();
        }

        UserEntity user = UserEntity.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(request.getPassword())
                )
                .build();

        userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request){
        UserEntity user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(InvalidCredentialsException::new);

        if(!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            throw new InvalidCredentialsException();
        }

        String token = jwtService.generateToken(user);

        return new LoginResponse(token);
    }
}
