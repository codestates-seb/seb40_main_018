//package project.danim.member.controller;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import project.danim.member.dto.MemberPostDto;
//import project.danim.member.dto.MemberResponseDto;
//import project.danim.member.service.MemberService;
//import project.danim.response.SingleResponseDto;
//
//import javax.validation.Valid;
//import javax.validation.constraints.Positive;
//
//@RestController
//@RequestMapping("/member")
//public class MemberController {
//    private final MemberService memberService;
//
//    public MemberController(MemberService memberService) {
//        this.memberService = memberService;
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<SingleResponseDto> register(@Valid @RequestBody MemberPostDto memberPostDto) {
//        MemberResponseDto memberResponseDto = memberService.createMember(memberPostDto);
//
//
//        return new ResponseEntity<>(new SingleResponseDto(memberResponseDto), HttpStatus.CREATED)
//    }
//
//    @GetMapping
//    public String getHello() {
//        return "Hello main project!!";
//    }
//
//    @GetMapping("/me")
//    public String getMe() {
//        return "Hello Member ME!";
//    }
//
//    @PatchMapping("/me")
//    public String patchMe() {
//        return "Patch Me!";
//    }
//
//    @GetMapping("/me/diaries")
//    public String getMyDiaries() {
//        return "This is my Diaries";
//    }
//
//    @GetMapping("/me/likes")
//    public String getMyLikedDiaries() {
//        return "This is Liked Diaries";
//    }
//
//    @PatchMapping("/{member-id}")
//    public String patchMyInfo(@Positive @PathVariable("member-id") long memberId) {
//        return "My Id is" + memberId;
//    }
//
//    @GetMapping("/{member-id}/diaries")
//    public String getMemberDiaries(@Positive @PathVariable("member-id") long memberId) {
//        return memberId + "'s diaries";
//    }
//
//}
