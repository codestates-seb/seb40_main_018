package project.danim.bucket.dto;

import lombok.Getter;

@Getter
public class BucketDeleteDto {

    private Long bucketId;

    public BucketDeleteDto(Long bucketId) {
        this.bucketId = bucketId;
    }

}
