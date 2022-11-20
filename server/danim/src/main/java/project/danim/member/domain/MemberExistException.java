package project.danim.member.domain;

import project.danim.exeption.BusinessLogicException;
import project.danim.exeption.ExceptionCode;

public class MemberExistException extends BusinessLogicException {
    public MemberExistException(ExceptionCode exceptionCode) {
        super(exceptionCode);
    }
}
