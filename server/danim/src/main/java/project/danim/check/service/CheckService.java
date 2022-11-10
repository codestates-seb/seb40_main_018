package project.danim.check.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import project.danim.check.domain.Check;
import project.danim.check.dto.CheckPostDto;
import project.danim.check.dto.CheckResponseDto;
import project.danim.check.repository.CheckRepository;
import project.danim.exeption.BusinessLogicException;
import project.danim.exeption.ExceptionCode;

import javax.validation.Valid;
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

        Optional<Check> optionalCheck =  checkRepository.findByCheckId(checkId);
        Check findCheck = optionalCheck.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CHECK_LIST_NOT_FOUND));

        return CheckResponseDto.of(findCheck);

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
    
    // 체크리스트 삭제

    

}
