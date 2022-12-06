package project.danim.bucket.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.danim.bucket.domain.Bucket;
import project.danim.bucket.dto.BucketDeleteDto;
import project.danim.bucket.dto.BucketPatchDto;
import project.danim.bucket.dto.BucketPostDto;
import project.danim.bucket.dto.BucketResponseDto;
import project.danim.bucket.service.BucketService;
import project.danim.member.dto.MemberResponseForMap;
import project.danim.response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Map;

@RestController
@Validated
public class BucketController {

    private BucketService bucketService;

    public BucketController(BucketService bucketService) {
        this.bucketService = bucketService;
    }

    // 전체 조회
    @GetMapping("/member/me/bucket-list")
    public ResponseEntity getBucket() {

        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<BucketResponseDto> bucket = bucketService.getMyBucket(email);

        return new ResponseEntity<>(new SingleResponseDto<>(bucket), HttpStatus.OK);
    }

    // 체크리스트 생성
    @PostMapping("/bucket-list")
    public ResponseEntity<SingleResponseDto> postBucket(@Valid @RequestBody BucketPostDto request) {

        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        BucketResponseDto response = bucketService.createBucket(request, email);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED);

    }

    // 체크리스트 수정
    @PatchMapping("/bucket-list/{bucket-id}")
    public ResponseEntity patchBucket(
            @Positive @PathVariable("bucket-id") Long bucketId,
            @RequestBody BucketPatchDto request) {

        BucketResponseDto response = bucketService.updateBucket(request, bucketId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);

    }

    // 체크리스트 삭제
    @DeleteMapping("/bucket-list/{bucket-id}")
    public ResponseEntity deleteBucket(@Positive @PathVariable("bucket-id") Long bucketId) {

        bucketService.deleteBucket(bucketId);

        return new ResponseEntity<>(new BucketDeleteDto(bucketId), HttpStatus.OK);

    }

}
