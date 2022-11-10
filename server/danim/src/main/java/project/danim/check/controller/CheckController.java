package project.danim.check.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.danim.check.dto.CheckPatchDto;
import project.danim.check.dto.CheckPostDto;
import project.danim.check.dto.CheckResponseDto;
import project.danim.check.service.CheckService;
import project.danim.response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

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

    // 체크리스트 생성
    @PostMapping
    public ResponseEntity<SingleResponseDto> postCheck(@Valid @RequestBody CheckPostDto request) {

        CheckResponseDto response = checkService.createCheck(request);

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
    public String deleteCheck(@Positive @PathVariable("check-id") long checkId) {
        return "Delete complete";
    }


}
