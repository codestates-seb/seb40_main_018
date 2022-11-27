package project.danim.check.domain;

import lombok.*;
import project.danim.audit.BaseTime;

import javax.persistence.*;

@Entity(name = "CHECK_LIST")
@Getter
@Setter
@NoArgsConstructor
public class Check extends BaseTime {

    @Id
    @Column(name = "CHECK_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checkId;

    @Column(length = 20)
    private String nickname;

    @Column(length = 100)
    private String checkContent;

    @Column(nullable = false)
    private Boolean isCheck;

    // TODO 멤버 1 - 체크 n // 멤버 1 - 체크리스트 1

//    @JoinColumn(name = "MEMBER_ID")
//    @ManyToOne(fetch = FetchType.LAZY)
//    private Member member;

    @Builder
    public Check(Long checkId, String checkContent, Boolean isCheck) {
        this.checkId = checkId;
        this.checkContent = checkContent;
        this.isCheck = isCheck;
    }

}
