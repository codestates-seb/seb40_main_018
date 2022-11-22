package project.danim.member.application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.danim.exeption.ExceptionCode;
import project.danim.member.adapter.out.persistence.MemberRepositoryPersistenceAdapter;
import project.danim.member.application.port.in.MemberQueriesUseCase;
import project.danim.member.application.port.in.response.MemberResponseForProfile;
import project.danim.member.domain.Member;
import project.danim.member.domain.MemberNotFoundException;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberQueries implements MemberQueriesUseCase {
    private final MemberRepositoryPersistenceAdapter memberPersistenceAdapter;

    @Override
    public MemberResponseForProfile getMyProfile(String email) {

        Member findMember = memberPersistenceAdapter.findByEmail(email)
                .orElseThrow(() -> new MemberNotFoundException(ExceptionCode.MEMBER_NOT_FOUND));

        return MemberResponseForProfile.builder()
                .memberId(findMember.getMemberId())
                .email(findMember.getEmail())
                .nickname(findMember.getNickname())
                .profileImg(findMember.getProfileImg())
                .aboutMe(findMember.getAboutMe())
                .build();
    }
}
