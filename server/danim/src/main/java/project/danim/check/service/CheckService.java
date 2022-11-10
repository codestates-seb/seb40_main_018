package project.danim.check.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.danim.check.domain.Check;
import project.danim.check.dto.CheckResponseDto;
import project.danim.check.repository.CheckRepository;
import project.danim.exeption.BusinessLogicException;
import project.danim.exeption.ExceptionCode;

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
    
    // 체크리스트 수정
    
    // 체크리스트 삭제
    
    

}
