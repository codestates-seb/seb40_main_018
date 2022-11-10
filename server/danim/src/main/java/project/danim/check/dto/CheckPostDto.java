package project.danim.check.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CheckPostDto {

    private String checkContent;

    private Boolean isCheck;

}
