package project.danim.diary.dto;


import lombok.Getter;
import lombok.Setter;
import org.springframework.transaction.annotation.Transactional;
import project.danim.diary.domain.Diary;
import project.danim.tag.domain.Tag;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class DiaryResponseDto {
    private final long diaryId;
    private final String title;
    private final String content;
    private final String weather;
    private final String city;
    private final String area;
    private final String question;
    private final List<String> tags;
    private final List<String> diaryImages;
    private final int cost;
    private final long memberId;
    private final long likeCount;
    private final LocalDateTime createdAt;
    private final LocalDateTime modifiedAt;
    private final int year;
    private final int month;
    private final int day;

    private DiaryResponseDto(long diaryId,
                             String title,
                             String content,
                             String weather,
                             String city,
                             String area,
                             String question,
                             int cost,
                             long memberId,
                             long likeCount,
                             LocalDateTime createdAt,
                             LocalDateTime modifiedAt,
                             int year,
                             int month,
                             int day,
                             List<String> tags,
                             List<String> diaryImages
                             ) {
        this.diaryId = diaryId;
        this.title = title;
        this.content = content;
        this.weather = weather;
        this.city = city;
        this.area = area;
        this.question = question;
        this.cost = cost;
        this.memberId = memberId;
        this.likeCount = likeCount;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
        this.year = year;
        this.month = month;
        this.day = day;
        this.tags = tags;
        this.diaryImages = new ArrayList<>(diaryImages);
    }

    public static DiaryResponseDto of(Diary diary, List<String> tags) {
        return new DiaryResponseDto(diary.getDiaryId(),
                diary.getTitle(),
                diary.getContent(),
                diary.getWeather(),
                diary.getCity(),
                diary.getArea(),
                diary.getQuestion(),
                diary.getCost(),
                diary.getMemberId(),
                diary.getLikesCount(),
                diary.getCreatedAt(),
                diary.getModifiedAt(),
                diary.getTravelDate().getYear(),
                diary.getTravelDate().getMonthValue(),
                diary.getTravelDate().getDayOfMonth(),
                tags,
                diary.getDiaryImages());
    }
}
