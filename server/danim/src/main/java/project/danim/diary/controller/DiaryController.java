package project.danim.diary.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.danim.diary.domain.Diary;
import project.danim.diary.dto.DiaryPostDto;
import project.danim.diary.mapper.DiaryMapper;
import project.danim.diary.service.DiaryService;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Api(tags = {"Diary API"})
@RestController
@Validated
@Slf4j
//@EnableJpaAuditing
@RequestMapping("/diary")
public class DiaryController {

    private DiaryService diaryService;
    private DiaryMapper diaryMapper;

    public DiaryController(DiaryService diaryService, DiaryMapper diaryMapper) {
        this.diaryService = diaryService;
        this.diaryMapper = diaryMapper;
    }


    @ApiOperation(value = "Diary 등록", response = Diary.class)
    @PostMapping
    public ResponseEntity postDiary(@Valid @RequestBody DiaryPostDto diaryPostDto) {
        Diary postdiary = diaryService.createDiary(diaryMapper.diaryPostDtoToDiary(diaryPostDto));

        return new ResponseEntity<>(
                (diaryMapper.diaryToDiaryResponseDto(postdiary)),HttpStatus.CREATED);
    }

   @ApiOperation(value = "특정 Diary 조회", response = Diary.class)
    @GetMapping("/{diary-id}")
    public ResponseEntity getDiary(@Positive @PathVariable("diary-id") @NotNull long diaryId) {
            Diary finddiary = diaryService.findDiary(diaryId);

        return new ResponseEntity<>((diaryMapper.diaryToDiaryResponseDtos(finddiary)),HttpStatus.OK);
    }

  @ApiOperation(value = "모든 Diary 조회", response = Diary.class)
    @GetMapping
    public ResponseEntity getDiaries() {

        return new ResponseEntity<>(HttpStatus.OK);
    }

   @ApiOperation(value = "Diary 수정", response = Diary.class)
    @PatchMapping("/{diary-id}")
    public ResponseEntity patchDiary(@Positive @PathVariable("diary-id") long diaryId) {
        return new ResponseEntity<>(HttpStatus.OK);
    }


    /*
     다이어리 삭제 구현
     */
   @ApiOperation(value = "Diary 삭제", response = Diary.class)
    @DeleteMapping("/{diary-id}")
    public ResponseEntity deleteDiary(@Positive @PathVariable("diary-id") long diaryId) {
        diaryService.deleteDiary(diaryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
