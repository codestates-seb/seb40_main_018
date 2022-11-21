package project.danim.member.domain;

import project.danim.exeption.BusinessLogicException;
import project.danim.exeption.ExceptionCode;

public class MemberExistsException extends BusinessLogicException {
    public MemberExistsException(ExceptionCode exceptionCode) {
        super(exceptionCode);
    }
}
