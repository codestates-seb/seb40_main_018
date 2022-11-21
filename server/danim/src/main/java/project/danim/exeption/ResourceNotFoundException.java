package project.danim.exeption;

import lombok.Getter;

public class ResourceNotFoundException extends RuntimeException{
    @Getter
    private ExceptionCode exceptionCode;

    public ResourceNotFoundException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
