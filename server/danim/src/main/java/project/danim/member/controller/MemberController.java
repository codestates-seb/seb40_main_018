package project.danim.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.danim.member.dto.MemberCreateForm;
import project.danim.member.dto.MemberProfilePatchForm;
import project.danim.member.dto.MemberResponseForProfile;
import project.danim.member.service.MemberQueries;
import project.danim.member.service.MemberService;
import project.danim.response.SingleResponseDto;

import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;
    private final MemberQueries memberQueries;



    @GetMapping("/me")
    public ResponseEntity getMyProfile() {
        // 권한 검사
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        MemberResponseForProfile member = memberQueries.getMyProfile(email);

        return new ResponseEntity<>(new SingleResponseDto<>(member), HttpStatus.OK);
    }

    @PatchMapping("/me")
    public ResponseEntity patchMe(@RequestBody @Validated MemberProfilePatchForm memberProfilePatchForm) {
        // 해당 profile 멤버 id와 현재 접속한 id가 같은지 확인

        MemberResponseForProfile updateMember = memberService.patchProfile(memberProfilePatchForm);
        return new ResponseEntity<>(new SingleResponseDto<>(updateMember), HttpStatus.OK);
    }

    @GetMapping("/me/diaries")
    public String getMyDiaries() {
        return "This is my Diaries";
    }

    @GetMapping("/me/likes")
    public String getMyLikedDiaries() {
        return "This is Liked Diaries";
    }

    @GetMapping("/{member-id}/diaries")
    public String getMemberDiaries(@Positive @PathVariable("member-id") long memberId) {
        return memberId + "'s diaries";
    }

}
