package project.danim.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.danim.exeption.ExceptionCode;
import project.danim.member.domain.Member;
import project.danim.member.domain.MemberNotFoundException;
import project.danim.member.dto.MemberResponseForProfile;
import project.danim.member.repository.MemberRepository;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberQueries {
    private final MemberRepository memberRepository;

    public MemberResponseForProfile getMyProfile(String email) {

        Member findMember = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberNotFoundException(ExceptionCode.MEMBER_NOT_FOUND));

        return MemberResponseForProfile.of(findMember);
    }
}
