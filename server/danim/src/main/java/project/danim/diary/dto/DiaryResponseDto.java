package project.danim.diary.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiaryResponseDto {
    private long diaryId;
    private String title;
    private String content;
    private int weather;
    private int cost;
    private long memberId;
}
