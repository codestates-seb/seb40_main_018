package project.danim.bucket.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import project.danim.bucket.domain.Bucket;
import project.danim.bucket.dto.BucketPatchDto;
import project.danim.bucket.dto.BucketPostDto;
import project.danim.bucket.dto.BucketResponseDto;
import project.danim.bucket.repository.BucketRepository;
import project.danim.check.domain.Check;
import project.danim.exeption.BusinessLogicException;
import project.danim.exeption.ExceptionCode;
import project.danim.member.domain.Member;
import project.danim.member.domain.MemberNotFoundException;
import project.danim.member.dto.MemberResponseForMap;
import project.danim.member.repository.MemberRepository;
import project.danim.member.service.MemberMap;
import project.danim.member.service.MemberService;
import project.danim.reply.dto.ReplyResponseDto;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class BucketService {

    private final BucketRepository bucketRepository;

    private final MemberService memberService;

    private final MemberRepository memberRepository;

    public BucketService(BucketRepository bucketRepository, MemberService memberService, MemberRepository memberRepository) {
        this.bucketRepository = bucketRepository;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    // 전체 조회
    public List<BucketResponseDto> getMyBucket(String email) {

        Member findMember = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberNotFoundException(ExceptionCode.MEMBER_NOT_FOUND));

        List<Bucket> bucketList = bucketRepository.findByMemberId(findMember.getMemberId());

        return bucketList.stream()
                .map(bucket -> BucketResponseDto.builder()
                        .bucketContent(bucket.getBucketContent())
                        .isBucket(bucket.getIsBucket())
                        .createdAt(bucket.getCreatedAt())
                        .bucketId(bucket.getBucketId())
                        .memberId(findMember.getMemberId())
                        .build())
                .collect(Collectors.toList());

    }

    // 버킷리스트 생성
    public BucketResponseDto createBucket(@Valid @RequestBody BucketPostDto request, String email) {

        Member findMember = memberService.findMember(email);

        Bucket bucket = Bucket.builder()
                .bucketContent(request.getBucketContent())
                .isBucket(request.getIsBucket())
                .memberId(findMember.getMemberId())
                .build();

        Bucket createdBucket = bucketRepository.save(bucket);

        return BucketResponseDto.of(createdBucket);

    }

    // 버킷리스트 수정
    public BucketResponseDto updateBucket(@Valid @RequestBody BucketPatchDto request, Long bucketId) {

        Optional<Bucket> optionalBucket = bucketRepository.findByBucketId(bucketId);
        Bucket findBucket = optionalBucket.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BUCKET_LIST_NOT_FOUND));

        Optional.ofNullable(request.getBucketContent())
                .ifPresent(bucketContent -> findBucket.setBucketContent(bucketContent));
        Optional.ofNullable(request.getIsBucket())
                .ifPresent(isBucket -> findBucket.setIsBucket(isBucket));
        Optional.ofNullable(request.getMemberId())
                .ifPresent(memberId -> findBucket.setMemberId(memberId));

        Bucket updatedBucket = bucketRepository.save(findBucket);

        return BucketResponseDto.of(updatedBucket);

    }

    // 버킷리스트 삭제
    public void deleteBucket(Long bucketId) {

        Optional<Bucket> findBucket = bucketRepository.findByBucketId(bucketId);

        bucketRepository.deleteById(bucketId);

    }
    
}
