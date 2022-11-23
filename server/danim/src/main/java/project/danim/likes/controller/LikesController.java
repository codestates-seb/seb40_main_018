package project.danim.likes.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import project.danim.diary.domain.Diary;
import project.danim.likes.service.LikesService;
import project.danim.member.domain.Member;

import javax.validation.constraints.Positive;
import java.util.Objects;

@Api(tags = {"Likes API"})
@Slf4j
@RestController
@RequestMapping("/likes")
public class LikesController {

    private final LikesService likesService;

    public LikesController(LikesService likesService){
        this.likesService = likesService;
    }
    /*
    @GetMapping("/{diary-id}")
    public String getLikeMembers(@Positive @PathVariable("diary-id") long dairyId) {
        return "Like click members!!";
    }

*/
    /*
    JWT를 이용한 로그인 정보 필요... .. 인증된 사용자 정보 가져요기
     */
    @ApiOperation(value = "좋아요 등록")
    @PostMapping("/{diary-id}")
    public ResponseEntity<String> addLike(@Positive @PathVariable("diary-id") long diaryId,
                                          @RequestParam("memberId") @Positive long memberId
                                          ){

     //  log.info("===================좋아요 클릭=======================");
        boolean result = false;

        if (memberId != 0) {
            result = likesService.booleanLike(memberId, diaryId);
        }
        return result ?
                new ResponseEntity<>("좋아요 추가", HttpStatus.CREATED) :
                new ResponseEntity<>("좋아요 삭제", HttpStatus.OK);
    }

    }

