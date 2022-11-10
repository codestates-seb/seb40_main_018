package project.danim.reply.controller;

import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/reply")
public class ReplyController {
    @GetMapping("/{diary-id}")
    public String getReply(@Positive @PathVariable("diary-id") long diaryId) {
        return "Reply Get!";
    }

    @PostMapping("/{reply-id}")
    public String postReply(@Positive @PathVariable("reply-id") long replyId) {
        return "Reply Post!";
    }

    @PatchMapping("/{reply-id}")
    public String patchReply(@Positive @PathVariable("reply-id") long replyId) {
        return "Reply Patch!";
    }

    @DeleteMapping("/{reply-id}")
    public String deleteReply(@Positive @PathVariable("reply-id") long replyId) {
        return "Reply Delete!";
    }
}
