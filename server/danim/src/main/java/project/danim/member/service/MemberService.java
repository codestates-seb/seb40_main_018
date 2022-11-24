package project.danim.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.danim.exeption.ExceptionCode;
import project.danim.member.domain.Member;
import project.danim.member.domain.MemberExistsException;
import project.danim.member.dto.MemberCreateForm;
import project.danim.member.dto.MemberProfilePatchForm;
import project.danim.member.dto.MemberResponseForProfile;
import project.danim.member.repository.MemberRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

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

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) {
            throw new MemberExistsException(ExceptionCode.MEMBER_EXISTS);
        }
    }
}
