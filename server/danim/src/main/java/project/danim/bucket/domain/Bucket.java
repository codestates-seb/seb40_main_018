package project.danim.bucket.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.danim.audit.BaseTime;
import project.danim.member.domain.Member;

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

    @Column(length = 100)
    private String bucketContent;

    @Column(nullable = false)
    private Boolean isBucket;

    private Long memberId;

    @Builder
    public Bucket(Long bucketId, String bucketContent, Boolean isBucket, Long memberId) {
        this.bucketId = bucketId;
        this.bucketContent = bucketContent;
        this.isBucket = isBucket;
        this.memberId = memberId;
    }
}
