package project.danim.bucket.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.danim.bucket.domain.Bucket;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BucketResponseDto {

    private Long bucketId;

    private String bucketContent;

    private Boolean isBucket;

    private LocalDateTime createdAt;

    public static BucketResponseDto of(Bucket bucket) {
        return new BucketResponseDto(bucket.getBucketId(), bucket.getBucketContent(), bucket.getIsBucket(), bucket.getCreatedAt());
    }
}
