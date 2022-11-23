package project.danim.reply.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class ReplyPostDto {

    @NotBlank(message="내용을 입력해주세요.")
    private String replyContent;

}
