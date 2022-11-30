package project.danim.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project.danim.exeption.ExceptionCode;
import project.danim.member.domain.Member;
import project.danim.member.domain.MemberNotFoundException;
import project.danim.member.dto.MemberProfilePatchForm;
import project.danim.member.dto.MemberResponseForProfile;
import project.danim.member.repository.MemberRepository;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public Member findMember(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() ->
                new MemberNotFoundException(ExceptionCode.MEMBER_NOT_FOUND));
    }
    public MemberResponseForProfile patchProfile(MemberProfilePatchForm memberProfilePatchForm) {
        Member findMember = memberRepository.findById(memberProfilePatchForm.getMemberId()).get();

        Optional.ofNullable(memberProfilePatchForm.getNickname())
                .ifPresent(findMember::changeNickname);
        Optional.ofNullable(memberProfilePatchForm.getProfileImg())
                .ifPresent(findMember::updateProfileImg);
        Optional.ofNullable(memberProfilePatchForm.getAboutMe())
                .ifPresent(findMember::updateAboutMe);

        return MemberResponseForProfile.of(findMember);
    }
}
