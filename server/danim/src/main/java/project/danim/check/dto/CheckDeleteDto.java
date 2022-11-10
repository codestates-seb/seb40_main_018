package project.danim.check.dto;

import lombok.Getter;

@Getter
public class CheckDeleteDto {

    private Long checkId;

    public CheckDeleteDto(Long checkId) {
        this.checkId = checkId;
    }
}
