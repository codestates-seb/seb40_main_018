package project.danim.likes.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/likes")
public class LikesController {

    /*
    @GetMapping("/{diary-id}")
    public String getLikeMembers(@Positive @PathVariable("diary-id") long dairyId) {
        return "Like click members!!";
    }


    /*
    JWT를 이용한 로그인 정보 필요... 사용자가 로그인 된 사용자인가?  LoginMember  ..
     */

    /*
    @PostMapping("/{diary-id}")
    public ResponseEntity<String>addLike (@PathVariable Long diaryId){

        boolean result = false;

        return "I Like this!";
    }
*/
}
