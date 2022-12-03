package project.danim.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import project.danim.S3.S3Service;
import project.danim.exeption.ExceptionCode;
import project.danim.member.domain.Member;
import project.danim.member.domain.MemberNotFoundException;
import project.danim.member.dto.MemberProfilePatchForm;
import project.danim.member.dto.MemberResponseForProfile;
import project.danim.member.repository.MemberRepository;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final S3Service s3Service;

    public Member findMember(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() ->
                new MemberNotFoundException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public Member findMember(long memberId) {
        return memberRepository.findById(memberId).orElseThrow(() ->
                new MemberNotFoundException(ExceptionCode.MEMBER_NOT_FOUND));
    }
    public MemberResponseForProfile patchProfile(MemberProfilePatchForm memberProfilePatchForm, MultipartFile multipartFile) throws IOException {
        Member findMember = memberRepository.findById(memberProfilePatchForm.getMemberId()).get();

        Optional.ofNullable(memberProfilePatchForm.getNickname())
                .ifPresent(findMember::changeNickname);
        Optional.ofNullable(memberProfilePatchForm.getAboutMe())
                .ifPresent(findMember::updateAboutMe);

        String newProfileImageUrl = s3Service.updateProfileImage(findMember.getProfileImg(), multipartFile);
        findMember.updateProfileImg(newProfileImageUrl);

        return MemberResponseForProfile.of(findMember);
    }
}
