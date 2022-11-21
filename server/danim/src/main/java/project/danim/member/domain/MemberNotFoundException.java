package project.danim.member.domain;

import project.danim.exeption.ExceptionCode;
import project.danim.exeption.ResourceNotFoundException;

public class MemberNotFoundException extends ResourceNotFoundException {

    public MemberNotFoundException(ExceptionCode exceptionCode) {
        super(exceptionCode);
    }
}
