package project.danim.bucket.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.danim.audit.BaseTime;

import javax.persistence.*;

@Entity(name = "BUCKET_LIST")
@Getter
@Setter
@NoArgsConstructor
public class Bucket extends BaseTime {

    @Id
    @Column(name = "BUCKET_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bucketId;

    @Column(length = 20)
    private String nickname;

    @Column(length = 100)
    private String bucketContent;

    @Column(nullable = false)
    private Boolean isBucket;

    // TODO 멤버 1 - 체크 n // 멤버 1 - 체크리스트 1

//    @JoinColumn(name = "MEMBER_ID")
//    @ManyToOne(fetch = FetchType.LAZY)
//    private Member member;

    @Builder
    public Bucket(Long bucketId, String bucketContent, Boolean isBucket) {
        this.bucketId = bucketId;
        this.bucketContent = bucketContent;
        this.isBucket = isBucket;
    }
}
