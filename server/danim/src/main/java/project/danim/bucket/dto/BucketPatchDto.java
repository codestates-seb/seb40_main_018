package project.danim.bucket.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class BucketPatchDto {

    @NotBlank(message="내용을 입력해주세요.")
    private String bucketContent;

    private Boolean isBucket;

}
