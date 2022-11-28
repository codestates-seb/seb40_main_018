package project.danim.tag.domain;

import lombok.*;
import project.danim.audit.BaseTime;
import project.danim.diary.domain.Diary;

import javax.persistence.*;

@Entity(name = "TAG")
@Getter
@Setter
@NoArgsConstructor
public class Tag extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    Long tagId;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id")
    private Diary diary;

    public void addDiary(Diary diary) {
        diary.addTag(this);
        this.diary = diary;
    }

    @Builder
    public Tag(Long tagId, String content) {
        this.tagId = tagId;
        this.content = content;
    }

}
