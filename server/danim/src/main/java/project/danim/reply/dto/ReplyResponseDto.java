package project.danim.reply.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.danim.diary.domain.Diary;
import project.danim.member.domain.Member;
import project.danim.reply.domain.Reply;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReplyResponseDto {

    private Long replyId;

    private Long diaryId;

    private String replyContent;

    private LocalDateTime createdAt;

    private String responseTo = "root";

    private Boolean exist = true;

    private Long memberId;

    private String nickname;

    public static ReplyResponseDto of(Reply reply, Diary diary, Member member) {
        return new ReplyResponseDto(reply.getReplyId(), diary.getDiaryId(), reply.getReplyContent(), reply.getCreatedAt(), reply.getResponseTo(), reply.getExist(), member.getMemberId(), member.getNickname());
    }

}
