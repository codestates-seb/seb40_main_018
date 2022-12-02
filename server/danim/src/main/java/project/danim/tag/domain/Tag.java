package project.danim.tag.domain;

import lombok.*;
import project.danim.audit.BaseTime;
import project.danim.diary.domain.Diary;

import javax.persistence.*;

@Entity(name = "TAG")
@Getter
@NoArgsConstructor
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long tagId;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private long diaryId;

    @Builder
    public Tag(String content, long diaryId) {
        this.content = content;
        this.diaryId = diaryId;
    }

}
