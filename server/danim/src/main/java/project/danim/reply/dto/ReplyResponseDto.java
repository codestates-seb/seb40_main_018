package project.danim.reply.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.danim.bucket.domain.Bucket;
import project.danim.bucket.dto.BucketResponseDto;
import project.danim.reply.domain.Reply;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReplyResponseDto {

    private Long replyId;

    private String replyContent;

    private LocalDateTime createdAt;

    public static ReplyResponseDto of(Reply reply) {
        return new ReplyResponseDto(reply.getReplyId(), reply.getReplyContent(), reply.getCreatedAt());
    }

}
