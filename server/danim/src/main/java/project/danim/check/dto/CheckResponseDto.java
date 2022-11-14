package project.danim.check.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.danim.check.domain.Check;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CheckResponseDto {

    private Long checkId;

    private String checkContent;

    private Boolean isCheck;

    private LocalDateTime createdAt;

    public static CheckResponseDto of(Check check) {
        return new CheckResponseDto(check.getCheckId(), check.getCheckContent(), check.getIsCheck(), check.getCreatedAt());
    }

}
