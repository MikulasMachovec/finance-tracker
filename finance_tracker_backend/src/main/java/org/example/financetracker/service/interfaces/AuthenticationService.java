package org.example.financetracker.service.interfaces;

import org.example.financetracker.entity.UserEntity;

public interface AuthenticationService {
    UserEntity getCurrentUser();
}
