package org.example.financetracker.exception;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String resourceName) {
        super(resourceName + " not found");
    }
}
