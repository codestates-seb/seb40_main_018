package project.danim.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.danim.member.dto.MemberProfilePatchForm;
import project.danim.member.dto.MemberResponseForMap;
import project.danim.member.dto.MemberResponseForProfile;
import project.danim.member.service.MemberQueries;
import project.danim.member.service.MemberService;
import project.danim.response.SingleResponseDto;

import javax.validation.constraints.Positive;
import java.util.Map;

@RestController
@RequiredArgsConstructor
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
    public ResponseEntity getMyDiaries(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {

        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return new ResponseEntity<>(memberQueries.getMyDiaries(email, page, size), HttpStatus.OK);
    }

    @GetMapping("/me/map")
    public ResponseEntity getMyMap() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Map<String, MemberResponseForMap> map = memberQueries.getMyMap(email);

        return new ResponseEntity<>(new SingleResponseDto<>(map), HttpStatus.OK);
    }

    @GetMapping("/me/likes")
    public String getMyLikedDiaries() {
        return "This is Liked Diaries";
    }


    @GetMapping("/{member-id}")
    public ResponseEntity getMemberProfile(@Positive @PathVariable("member-id") long memberId) {
        MemberResponseForProfile member = memberQueries.getMemberProfile(memberId);

        return new ResponseEntity<>(new SingleResponseDto<>(member), HttpStatus.OK);
    }

    @GetMapping("/{member-id}/diaries")
    public ResponseEntity getMemberDiaries(@Positive @PathVariable("member-id") long memberId,
                                           @Positive @RequestParam int page,
                                           @Positive @RequestParam int size) {
        return new ResponseEntity<>(memberQueries.getMemberProfileDiaries(memberId, page, size), HttpStatus.OK);
    }

}
