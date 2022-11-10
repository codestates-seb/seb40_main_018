package project.danim.check.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.danim.check.domain.Check;
import project.danim.check.dto.CheckResponseDto;
import project.danim.check.service.CheckService;
import project.danim.response.SingleResponseDto;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/check-list")
public class CheckController {

    private CheckService checkService;

    public CheckController(CheckService checkService) {
        this.checkService = checkService;
    }

    // 1개 조회
    @GetMapping
    public ResponseEntity<> getCheck(Long checkId) {

        return new ResponseEntity<>(
                new SingleResponseDto<>(checkService.findCheck(checkId)), HttpStatus.OK);

    }

    // 체크리스트 생성
    @PostMapping
    public String postCheck() {
        return "Add complete";
    }

    // 체크리스트 수정
    @PatchMapping("/{check-id}")
    public String patchCheck(@Positive @PathVariable("check-id") long checkId) {
        return "Patch complete";
    }

    // 체크리스트 삭제
    @DeleteMapping("/{check-id}")
    public String deleteCheck(@Positive @PathVariable("check-id") long checkId) {
        return "Delete complete";
    }


}
