package project.danim.diary.dto;

import lombok.Getter;
import project.danim.diary.domain.Diary;

@Getter
public class DiaryResponseDtoForCard {
    private final Long diaryId;

    private final String city;

    private final int year;
    private final int month;
    private final int day;

    private final String imageUrl;

    private DiaryResponseDtoForCard(Long diaryId, String city, int year, int month, int day, String imageUrl) {
        this.diaryId = diaryId;
        this.city = city;
        this.year = year;
        this.month = month;
        this.day = day;
        this.imageUrl = imageUrl;
    }

    public static DiaryResponseDtoForCard of(Diary diary) {
        return new DiaryResponseDtoForCard(diary.getDiaryId(),
                diary.getCity(),
                diary.getTravelDate().getYear(),
                diary.getTravelDate().getMonthValue(),
                diary.getTravelDate().getDayOfMonth(),
                diary.getDiaryImages().get(0));
    }
}
