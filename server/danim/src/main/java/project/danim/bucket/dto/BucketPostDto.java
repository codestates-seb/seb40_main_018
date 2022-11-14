package project.danim.bucket.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class BucketPostDto {

    @NotBlank(message="내용을 입력해주세요.")
    private String bucketContent;

    private Boolean isBucket;

}
