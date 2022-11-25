package project.danim.member.service;

import project.danim.exeption.ExceptionCode;
import project.danim.member.domain.Member;
import project.danim.member.domain.MemberExistsException;
import project.danim.member.repository.MemberRepository;

import java.util.Optional;

public final class MemberServiceHelper {
    public static void verifyExistsEmail(MemberRepository repository, String email) {
        Optional<Member> member = repository.findByEmail(email);
        if (member.isPresent()) {
            throw new MemberExistsException(ExceptionCode.MEMBER_EXISTS);
        }
    }
}
