package project.danim.member.dto;

import lombok.Getter;
import project.danim.diary.domain.Diary;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class MemberResponseForProfileDiaries {
    private final Long diaryId;

    private final String city;

    private final LocalDate travelDate;

    private MemberResponseForProfileDiaries(Long diaryId, String city, LocalDate travelDate) {
        this.diaryId = diaryId;
        this.city = city;
        this.travelDate = travelDate;
    }

    public static MemberResponseForProfileDiaries of(Diary diary) {
        return new MemberResponseForProfileDiaries(diary.getDiaryId(),
                diary.getCity(),
                diary.getTravelDate());
    }
}
