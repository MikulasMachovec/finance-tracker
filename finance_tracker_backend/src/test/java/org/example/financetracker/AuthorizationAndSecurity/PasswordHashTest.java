package org.example.financetracker.AuthorizationAndSecurity;

import org.example.financetracker.dto.auth.RegisterRequest;
import org.example.financetracker.entity.UserEntity;
import org.example.financetracker.repository.UserRepository;
import org.example.financetracker.service.AuthService;
import org.example.financetracker.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PasswordHashTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    private PasswordEncoder passwordEncoder;
    private AuthService authService;

    @BeforeEach
    void setUp() {
        passwordEncoder = new BCryptPasswordEncoder();

        authService = new AuthService(
                userRepository,
                passwordEncoder,
                jwtService
        );
    }

    @Test
    void shouldStorePasswordAsBcryptHash() {
//        Arrange
        String rawPassword = "TestPassword123";
        RegisterRequest request = new RegisterRequest();
        request.setFirstName("FirstName");
        request.setLastName("LastName");
        request.setEmail("test@example.com");
        request.setPassword(rawPassword);

        when(userRepository.existsByEmail(request.getEmail()))
                .thenReturn(false);

//        Act
        authService.register(request);

//        Capture the user passed to the repository
        ArgumentCaptor<UserEntity> captor =
                ArgumentCaptor.forClass(UserEntity.class);

        verify(userRepository).save(captor.capture());
        UserEntity savedUser = captor.getValue();
        String storedPassword = savedUser.getPassword();

//        Assert
        assertNotEquals(rawPassword, storedPassword,
                "Passwords must not be stored as plain text");

        assertTrue(storedPassword.startsWith("$2"),
                "Stored password should have Bcrypt hash prefix");

        assertTrue(passwordEncoder.matches(rawPassword, storedPassword),
                "Bcrypt hash should match the original password");
    }
}
