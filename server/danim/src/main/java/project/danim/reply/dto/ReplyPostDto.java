package project.danim.reply.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ReplyPostDto {

    @NotBlank(message="내용을 입력해주세요.")
    private String replyContent;

    private Long replyId;

    private Long diaryId;

    private LocalDateTime createdAt;

    private String responseTo = "root";

    private Boolean exist = true;

    private Long memberId;

    private String nickname;

}
