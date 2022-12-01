package project.danim.check.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.danim.check.domain.Check;
import project.danim.check.dto.CheckDeleteDto;
import project.danim.check.dto.CheckPatchDto;
import project.danim.check.dto.CheckPostDto;
import project.danim.check.dto.CheckResponseDto;
import project.danim.check.service.CheckService;
import project.danim.response.MultiResponseDto;
import project.danim.response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequestMapping("/check-list")
public class CheckController {

    private CheckService checkService;

    public CheckController(CheckService checkService) {
        this.checkService = checkService;
    }

    // 1개 조회
    @GetMapping("/{check-id}")
    public ResponseEntity<SingleResponseDto> getCheck(
            @PathVariable("check-id") @Positive Long checkId) {

        return new ResponseEntity<>(
                new SingleResponseDto<>(checkService.findCheck(checkId)), HttpStatus.OK);

    }

    // 전체 조회
    @GetMapping
    public List<Check> getChecks() {

        List<Check> checkList = checkService.findChecks();

        return checkList;
    }

    // 체크리스트 생성
    @PostMapping
    public ResponseEntity<SingleResponseDto> postCheck(@Valid @RequestBody CheckPostDto request) {

        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        CheckResponseDto response = checkService.createCheck(request, email);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED);

    }

    // 체크리스트 수정
    @PatchMapping("/{check-id}")
    public ResponseEntity patchCheck(
            @Positive @PathVariable("check-id") Long checkId,
            @RequestBody CheckPatchDto request) {

        CheckResponseDto response = checkService.updateCheck(request, checkId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);

    }

    // 체크리스트 삭제
    @DeleteMapping("/{check-id}")
    public ResponseEntity deleteCheck(@Positive @PathVariable("check-id") Long checkId) {

        checkService.deleteCheck(checkId);

        return new ResponseEntity<>(new CheckDeleteDto(checkId), HttpStatus.OK);

    }

}
