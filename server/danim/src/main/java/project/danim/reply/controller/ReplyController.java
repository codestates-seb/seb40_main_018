package project.danim.reply.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import project.danim.diary.domain.Diary;
import project.danim.diary.service.DiaryService;
import project.danim.member.domain.Member;
import project.danim.member.service.MemberService;
import project.danim.reply.domain.Reply;
import project.danim.reply.dto.ReplyDeleteDto;
import project.danim.reply.dto.ReplyPatchDto;
import project.danim.reply.dto.ReplyPostDto;
import project.danim.reply.dto.ReplyResponseDto;
import project.danim.reply.service.ReplyService;
import project.danim.response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;

@RestController
@RequestMapping("/reply")
public class ReplyController {

    private final ReplyService replyService;
    private final DiaryService diaryService;
    private final MemberService memberService;

    public ReplyController(ReplyService replyService, DiaryService diaryService, MemberService memberService) {
        this.replyService = replyService;
        this.diaryService = diaryService;
        this.memberService = memberService;
    }

    // 전체 조회
    @GetMapping("/{diary-id}")
    public ResponseEntity<SingleResponseDto> getReplies(@PathVariable("diary-id") Long diaryId, Member member) {

        return new ResponseEntity<>(new SingleResponseDto<>(replyService.findReplies(diaryId, member)), HttpStatus.OK);

    }

    // 댓글 생성
    @PostMapping("/{diary-id}")
    public ResponseEntity<SingleResponseDto> postReply(@Valid @RequestBody ReplyPostDto request,
                                                       @PathVariable("diary-id") Long diaryId,
                                                       Member member,
                                                       Reply reply) {

        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Diary diary = diaryService.findDiary(diaryId);

        ReplyResponseDto response = replyService.createReply(request, reply, diary, member, email);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED);

    }

    // 댓글 수정
    @PatchMapping("/{reply-id}")
    public ResponseEntity patchReply(
            @Positive @PathVariable("reply-id") Long replyId,
            @RequestBody ReplyPatchDto request) {

        Reply response = replyService.updateReply(request, replyId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);

    }

    // 댓글 삭제
    @DeleteMapping("/{reply-id}")
    public ResponseEntity deleteReply(@Positive @PathVariable("reply-id") Long replyId) {

        replyService.deleteReply(replyId);

        return new ResponseEntity<>(new ReplyDeleteDto(replyId), HttpStatus.OK);

    }

}
