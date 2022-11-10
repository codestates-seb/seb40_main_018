package project.danim.check.domain;

import lombok.*;
import project.danim.audit.BaseTime;
import project.danim.member.domain.Member;

import javax.persistence.*;

@Entity(name = "CHECK_LIST")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Check extends BaseTime {

    @Id
    @Column(name = "CHECK_LIST")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checkId;

    private String checkContent;

    private Boolean isCheck;

    // TODO 멤버 1 - 체크 n // 멤버 1 - 체크리스트 1

    @JoinColumn(name = "MEMBER_ID")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    public void addMember(Member member) {
        this.member = member;
    }


}
