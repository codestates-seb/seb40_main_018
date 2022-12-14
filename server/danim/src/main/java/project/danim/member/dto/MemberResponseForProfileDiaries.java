package project.danim.member.dto;

import lombok.Getter;
import project.danim.diary.domain.Diary;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class MemberResponseForProfileDiaries {
    private final Long diaryId;

    private final String city;

    private final int year;
    private final int month;
    private final int day;

    private final String imageUrl;

    private MemberResponseForProfileDiaries(Long diaryId, String city, int year, int month, int day, String imageUrl) {
        this.diaryId = diaryId;
        this.city = city;
        this.year = year;
        this.month = month;
        this.day = day;
        this.imageUrl = imageUrl;
    }

    public static MemberResponseForProfileDiaries of(Diary diary) {
        return new MemberResponseForProfileDiaries(diary.getDiaryId(),
                diary.getCity(),
                diary.getTravelDate().getYear(),
                diary.getTravelDate().getMonthValue(),
                diary.getTravelDate().getDayOfMonth(),
                diary.getDiaryImages().get(0));
    }
}
