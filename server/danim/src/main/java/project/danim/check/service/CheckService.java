package project.danim.check.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import project.danim.check.domain.Check;
import project.danim.check.dto.CheckPatchDto;
import project.danim.check.dto.CheckPostDto;
import project.danim.check.dto.CheckResponseDto;
import project.danim.check.repository.CheckRepository;
import project.danim.exeption.BusinessLogicException;
import project.danim.exeption.ExceptionCode;
import project.danim.response.MultiResponseDto;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CheckService {

    private final CheckRepository checkRepository;

    public CheckService(CheckRepository checkRepository) {
        this.checkRepository = checkRepository;
    }

    // 1개 조회
    public CheckResponseDto findCheck(Long checkId) {

        Optional<Check> optionalCheck = checkRepository.findByCheckId(checkId);
        Check findCheck = optionalCheck.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHECK_LIST_NOT_FOUND));

        return CheckResponseDto.of(findCheck);

    }

    // 전체 조회
    public List<Check> findChecks() {
        return checkRepository.findAll();
    }

    // 체크리스트 생성
    public CheckResponseDto createCheck(@Valid @RequestBody CheckPostDto request) {

        // TODO 회원 확인 필요

        Check check = Check.builder()
                .checkContent(request.getCheckContent())
                .isCheck(request.getIsCheck())
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

        Check updatedCheck = checkRepository.save(findCheck);

        return CheckResponseDto.of(updatedCheck);

    }

    // 체크리스트 삭제
    public void deleteCheck(Long checkId) {

        Optional<Check> findCheck = checkRepository.findByCheckId(checkId);

        checkRepository.deleteById(checkId);

    }

}
