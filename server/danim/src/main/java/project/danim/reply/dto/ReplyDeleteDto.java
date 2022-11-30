package project.danim.reply.dto;

import lombok.Getter;

@Getter
public class ReplyDeleteDto {

    private Long replyId;

    public ReplyDeleteDto(Long replyId) {
        this.replyId = replyId;
    }
}
