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

    @Column(length = 100)
    private String checkContent;

    @Column(nullable = false)
    private Boolean isCheck;

    private Long memberId;

    @Builder
    public Check(Long checkId, String checkContent, Boolean isCheck, Long memberId) {
        this.checkId = checkId;
        this.checkContent = checkContent;
        this.isCheck = isCheck;
        this.memberId = memberId;
    }

}
