package project.danim.check.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import project.danim.bucket.domain.Bucket;
import project.danim.bucket.dto.BucketResponseDto;
import project.danim.check.domain.Check;
import project.danim.check.dto.CheckPatchDto;
import project.danim.check.dto.CheckPostDto;
import project.danim.check.dto.CheckResponseDto;
import project.danim.check.repository.CheckRepository;
import project.danim.exeption.BusinessLogicException;
import project.danim.exeption.ExceptionCode;
import project.danim.member.domain.Member;
import project.danim.member.domain.MemberNotFoundException;
import project.danim.member.repository.MemberRepository;
import project.danim.member.service.MemberService;
import project.danim.response.MultiResponseDto;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CheckService {

    private final CheckRepository checkRepository;

    private final MemberService memberService;

    private final MemberRepository memberRepository;

    public CheckService(CheckRepository checkRepository, MemberService memberService, MemberRepository memberRepository) {
        this.checkRepository = checkRepository;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    // 1개 조회
    public CheckResponseDto findCheck(Long checkId) {

        Optional<Check> optionalCheck = checkRepository.findByCheckId(checkId);
        Check findCheck = optionalCheck.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHECK_LIST_NOT_FOUND));

        return CheckResponseDto.of(findCheck);

    }

    // 전체 조회
    public List<CheckResponseDto> getMyCheck(String email) {

        Member findMember = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberNotFoundException(ExceptionCode.MEMBER_NOT_FOUND));

        List<Check> checkList = checkRepository.findByMemberId(findMember.getMemberId());

        return checkList.stream()
                .map(check -> CheckResponseDto.builder()
                        .checkContent(check.getCheckContent())
                        .isCheck(check.getIsCheck())
                        .createdAt(check.getCreatedAt())
                        .checkId(check.getCheckId())
                        .memberId(findMember.getMemberId())
                        .build())
                .collect(Collectors.toList());

    }

    // 체크리스트 생성
    public CheckResponseDto createCheck(@Valid @RequestBody CheckPostDto request, String email) {

        Member findMember = memberService.findMember(email);

        Check check = Check.builder()
                .checkContent(request.getCheckContent())
                .isCheck(request.getIsCheck())
                .memberId(findMember.getMemberId())
                .build();

        Check createdCheck = checkRepository.save(check);

        return CheckResponseDto.of(createdCheck);

    }

    // 체크리스트 수정
    public CheckResponseDto updateCheck(@Valid @RequestBody CheckPatchDto request, Long checkId) {

        Optional<Check> optionalCheck = checkRepository.findByCheckId(checkId);
        Check findCheck = optionalCheck.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHECK_LIST_NOT_FOUND));

        Optional.ofNullable(request.getCheckContent())
                .ifPresent(checkContent -> findCheck.setCheckContent(checkContent));
        Optional.ofNullable(request.getIsCheck())
                .ifPresent(isCheck -> findCheck.setIsCheck(isCheck));
        Optional.ofNullable(request.getMemberId())
                .ifPresent(memberId -> findCheck.setMemberId(memberId));

        Check updatedCheck = checkRepository.save(findCheck);

        return CheckResponseDto.of(updatedCheck);

    }

    // 체크리스트 삭제
    public void deleteCheck(Long checkId) {

        Optional<Check> findCheck = checkRepository.findByCheckId(checkId);

        checkRepository.deleteById(checkId);

    }

}
