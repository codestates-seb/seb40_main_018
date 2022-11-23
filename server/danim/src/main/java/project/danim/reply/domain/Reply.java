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

    @Column(length = 500)
    private String replyContent;

    @ManyToOne
    @JoinColumn(name = "DIARY")
    private Diary diary;

    @Builder
    public Reply(Long replyId, String replyContent) {
        this.replyId = replyId;
        this.replyContent = replyContent;
    }

}
