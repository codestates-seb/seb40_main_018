package project.danim.member.controller;

import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/member")
public class MemberController {
    @PostMapping("/register")
    public String register() {
        return "register~";
    }

    @GetMapping
    public String getHello() {
        return "Hello main project!!";
    }

    @GetMapping("/me")
    public String getMe() {
        return "Hello Member ME!";
    }

    @PatchMapping("/me")
    public String patchMe() {
        return "Patch Me!";
    }

    @GetMapping("/me/diaries")
    public String getMyDiaries() {
        return "This is my Diaries";
    }

    @GetMapping("/me/likes")
    public String getMyLikedDiaries() {
        return "This is Liked Diaries";
    }

    @PatchMapping("/{member-id}")
    public String patchMyInfo(@Positive @PathVariable("member-id") long memberId) {
        return "My Id is" + memberId;
    }

    @GetMapping("/{member-id}/diaries")
    public String getMemberDiaries(@Positive @PathVariable("member-id") long memberId) {
        return memberId + "'s diaries";
    }

}
