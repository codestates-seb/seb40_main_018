package project.danim.bucket.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import project.danim.bucket.domain.Bucket;
import project.danim.bucket.dto.BucketPatchDto;
import project.danim.bucket.dto.BucketPostDto;
import project.danim.bucket.dto.BucketResponseDto;
import project.danim.bucket.repository.BucketRepository;
import project.danim.exeption.BusinessLogicException;
import project.danim.exeption.ExceptionCode;
import project.danim.member.domain.Member;
import project.danim.member.service.MemberService;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BucketService {

    private final BucketRepository bucketRepository;

    private final MemberService memberService;

    public BucketService(BucketRepository bucketRepository, MemberService memberService) {
        this.bucketRepository = bucketRepository;
        this.memberService = memberService;
    }

    // 1개 조회
    public BucketResponseDto findBucket(Long bucketId) {

        Optional<Bucket> optionalBucket = bucketRepository.findByBucketId(bucketId);
        Bucket findBucket = optionalBucket.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BUCKET_LIST_NOT_FOUND));

        return BucketResponseDto.of(findBucket);

    }

    // 전체 조회
    public List<Bucket> findBuckets() {
        return bucketRepository.findAll();
    }

    // 체크리스트 생성
    public BucketResponseDto createBucket(@Valid @RequestBody BucketPostDto request, String email) {

        Member findMember = memberService.findMember(email);


        Bucket bucket = Bucket.builder()
                .bucketContent(request.getBucketContent())
                .isBucket(request.getIsBucket())
                .build();

        Bucket createdBucket = bucketRepository.save(bucket);

        return BucketResponseDto.of(createdBucket);

    }

    // 체크리스트 수정
    public BucketResponseDto updateBucket(@Valid @RequestBody BucketPatchDto request, Long bucketId) {

        Optional<Bucket> optionalBucket = bucketRepository.findByBucketId(bucketId);
        Bucket findBucket = optionalBucket.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BUCKET_LIST_NOT_FOUND));

        Optional.ofNullable(request.getBucketContent())
                .ifPresent(bucketContent -> findBucket.setBucketContent(bucketContent));
        Optional.ofNullable(request.getIsBucket())
                .ifPresent(isBucket -> findBucket.setIsBucket(isBucket));

        Bucket updatedBucket = bucketRepository.save(findBucket);

        return BucketResponseDto.of(updatedBucket);

    }

    // 체크리스트 삭제
    public void deleteBucket(Long bucketId) {

        Optional<Bucket> findBucket = bucketRepository.findByBucketId(bucketId);

        bucketRepository.deleteById(bucketId);

    }
    
}
