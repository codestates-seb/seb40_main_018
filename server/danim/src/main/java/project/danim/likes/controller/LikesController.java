package project.danim.likes.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import project.danim.diary.domain.Diary;
import project.danim.likes.service.LikesService;
import project.danim.member.domain.Member;
import project.danim.response.SingleResponseDto;

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
        @GetMapping("/{diary-id}")
        public ResponseEntity getLike(@Positive @PathVariable("diary-id") long diaryId) {
            String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            return new ResponseEntity<>(new SingleResponseDto<>(likesService.findLike(diaryId, email)), HttpStatus.OK);
        }
        @ApiOperation(value = "좋아요 등록")
        @PostMapping("/{diary-id}")
        public ResponseEntity addLike(@Positive @PathVariable("diary-id") long diaryId) {
            String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            return new ResponseEntity<>(new SingleResponseDto<>(likesService.checkLike(diaryId, email)), HttpStatus.OK);
        }

    }

