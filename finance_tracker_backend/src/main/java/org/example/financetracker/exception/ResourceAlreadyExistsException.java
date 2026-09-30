package org.example.financetracker.exception;

public class ResourceAlreadyExistsException extends RuntimeException {
    public ResourceAlreadyExistsException(String resourceName) {
        super(resourceName + " already exists");
    }
}
