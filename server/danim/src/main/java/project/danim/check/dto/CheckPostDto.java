package project.danim.check.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
//@Builder
@NoArgsConstructor
public class CheckPostDto {

    @NotBlank(message="내용을 입력해주세요.")
    private String checkContent;

    private Boolean isCheck;

}
