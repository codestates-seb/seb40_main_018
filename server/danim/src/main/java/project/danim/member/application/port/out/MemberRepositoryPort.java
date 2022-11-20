package project.danim.member.application.port.out;

import project.danim.member.domain.Member;

import java.util.Optional;

public interface MemberRepositoryPort {
    Member createMember(Member member);
    Optional<Member> findById(Long memberId);
    Optional<Member> findByEmail(String email);
}
