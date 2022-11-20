package project.danim.member.adapter.out.persistence;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import project.danim.member.application.port.out.MemberRepositoryPort;
import project.danim.member.domain.Member;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MemberRepositoryPersistenceAdapter implements MemberRepositoryPort {
    private final MemberRepository memberRepository;

    @Override
    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

    @Override
    public Optional<Member> findById(Long memberId) {
        return memberRepository.findById(memberId);
    }

    @Override
    public Optional<Member> findByEmail(String email) { return memberRepository.findByEmail(email);}
}
