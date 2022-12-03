package project.danim.diary.dto;

import lombok.Getter;
import project.danim.diary.domain.Diary;
import project.danim.member.domain.Member;

import java.util.List;

@Getter
public class DiaryResponseDtoForCard {
    private final Long diaryId;

    private final String title;
    private final String content;
    private final String area;
    private final String city;

    private final Long memberId;

    private final String weather;

    private final String nickname;
    private final int cost;

    private final int year;
    private final int month;
    private final int day;

    private final String imageUrl;

    private final List<String> tags;

    private DiaryResponseDtoForCard(Long diaryId, String title, String area, String city, String content, Long memberId, String weather, String nickname, int cost, int year, int month, int day, String imageUrl, List<String> tags) {
        this.diaryId = diaryId;
        this.title = title;
        this.content = content;
        this.area = area;
        this.city = city;
        this.memberId = memberId;
        this.weather = weather;
        this.nickname = nickname;
        this.cost = cost;
        this.year = year;
        this.month = month;
        this.day = day;
        this.imageUrl = imageUrl;
        this.tags = tags;
    }

    public static DiaryResponseDtoForCard of(Diary diary, Member member, List<String> tags) {
        return new DiaryResponseDtoForCard(diary.getDiaryId(),
                diary.getTitle(),
                diary.getArea(),
                diary.getCity(),
                diary.getContent(),
                diary.getMemberId(),
                diary.getWeather(),
                member.getNickname(),
                diary.getCost(),
                diary.getTravelDate().getYear(),
                diary.getTravelDate().getMonthValue(),
                diary.getTravelDate().getDayOfMonth(),
                diary.getDiaryImages().get(0),
                tags
                );
    }
}
