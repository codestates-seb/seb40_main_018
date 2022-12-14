package project.danim.tag.dto;

import lombok.*;
import project.danim.diary.domain.Diary;
import project.danim.member.domain.Member;
import project.danim.tag.domain.Tag;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
public class TagDiaryResponseDto {
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

    private final boolean isLike;
    private final String imageUrl;
    private final List<String> tags;
    private TagDiaryResponseDto (Long diaryId,
                                 String title,
                                 String area,
                                 String city,
                                 String content,
                                 Long memberId,
                                 String weather,
                                 String nickname,
                                 int cost,
                                 int year,
                                 int month,
                                 int day,
                                 boolean isLike,
                                 String imageUrl,
                                 List<String> tags) {
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
        this.isLike = isLike;
        this.imageUrl = imageUrl;
        this.tags = tags;
    }

    public static TagDiaryResponseDto of(Diary diary, boolean isLike, Member member, List<String> tags) {

        return new TagDiaryResponseDto(diary.getDiaryId(),
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
                isLike,
                diary.getDiaryImages().get(0),
                tags
                );
    }

}
