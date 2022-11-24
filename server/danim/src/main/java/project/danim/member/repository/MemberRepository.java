package project.danim.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.danim.member.domain.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findById(Long memberId);
    Optional<Member> findByEmail(String email);
}
