package project.danim.reply.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.danim.audit.BaseTime;
import project.danim.diary.domain.Diary;

import javax.persistence.*;

@Entity(name = "REPLY")
@Getter
@Setter
@NoArgsConstructor
public class Reply extends BaseTime {

    @Id
    @Column(name = "REPLY_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyId;

    private String replyContent;

    private String responseTo = "root";

    private Boolean exist = true;

    @Column(nullable = false)
    private Long memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DIARY_ID")
    private Diary diary;

    public void addDiary(Diary diary) {
        diary.addReply(this);
        this.diary = diary;
    }

    @Builder
    public Reply(Long replyId, String replyContent, String responseTo, Boolean exist, Long memberId) {
        this.replyId = replyId;
        this.replyContent = replyContent;
        this.responseTo = responseTo;
        this.exist = exist;
        this.memberId = memberId;
    }
}
