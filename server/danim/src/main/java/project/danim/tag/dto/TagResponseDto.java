package project.danim.tag.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.danim.tag.domain.Tag;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TagResponseDto {

    private Long tagId;

    private Long diaryId;

    private String content;



    public static TagResponseDto of(Tag tag) {

        return new TagResponseDto(tag.getTagId(), tag.getTagId(),tag.getContent());
    }

}
