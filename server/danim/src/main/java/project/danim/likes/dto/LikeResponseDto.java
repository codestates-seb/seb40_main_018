package project.danim.likes.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LikeResponseDto {
    private boolean isLike;

    public LikeResponseDto(boolean isLike) {
        this.isLike = isLike;
    }
}
