package project.danim.tag.dto;

import lombok.*;
import project.danim.diary.domain.Diary;
import project.danim.tag.domain.Tag;

import java.time.LocalDateTime;

@Setter
@Getter
public class TagDiaryResponseDto {
    private Long diaryId;

    private final String city;

    private final int year;
    private final int month;
    private final int day;

    private TagDiaryResponseDto (Long diaryId, String city, int year, int month, int day) {
        this.diaryId = diaryId;
        this.city = city;
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public static TagDiaryResponseDto of(Diary diary) {

        return new TagDiaryResponseDto(diary.getDiaryId(), diary.getCity(), diary.getTravelDate().getYear(), diary.getTravelDate().getMonthValue(), diary.getTravelDate().getDayOfMonth());
    }

}
