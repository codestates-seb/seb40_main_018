package project.danim.diary.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.danim.diary.domain.Diary;
import project.danim.diary.dto.DiaryPatchDto;
import project.danim.diary.dto.DiaryPostDto;
import project.danim.diary.dto.DiaryResponseDto;
import project.danim.diary.mapper.DiaryMapper;
import project.danim.diary.service.DiaryService;
import project.danim.response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Api(tags = {"Diary API"})
@RestController
@Validated
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/diary")
public class DiaryController {

    private final DiaryService diaryService;
    private final DiaryMapper diaryMapper;

    public DiaryController(DiaryService diaryService, DiaryMapper diaryMapper) {
        this.diaryService = diaryService;
        this.diaryMapper = diaryMapper;
    }


    @ApiOperation(value = "Diary 등록", response = Diary.class)
    @PostMapping
    public ResponseEntity postDiary(@Valid @RequestBody DiaryPostDto diaryPostDto) throws JsonProcessingException {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        DiaryResponseDto postDiary = diaryService.createDiary(diaryPostDto, email);

        return new ResponseEntity<>(new SingleResponseDto<>(postDiary), HttpStatus.CREATED);
    }

    @ApiOperation(value = "특정 Diary 조회", response = Diary.class)
    @GetMapping("/{diary-id}")
    public ResponseEntity getDiary(@Positive @PathVariable("diary-id") @NotNull long diaryId) {
            Diary finddiary = diaryService.findDiary(diaryId);

        return new ResponseEntity<>((diaryMapper.diaryToDiaryResponseDtos(finddiary)),HttpStatus.OK);
    }

    @ApiOperation(value = "모든 Diary 조회", response = Diary.class)
    @GetMapping
    public ResponseEntity getDiaries(@Positive @RequestParam int size,
                                     @Positive @RequestParam int page) {
        return new ResponseEntity<>(diaryService.findDiaries(size, page), HttpStatus.OK);
    }

    @GetMapping("/cost")
    public ResponseEntity getDiariesFilterCost(@Positive @RequestParam int min,
                                               @Positive @RequestParam int max,
                                               @Positive @RequestParam int size,
                                               @Positive @RequestParam int page) {
        return new ResponseEntity<>(diaryService.findDiariesFilterCost(min, max, size, page), HttpStatus.OK);
    }

    @ApiOperation(value = "Diary 수정", response = Diary.class)
    @PatchMapping("/{diary-id}")
    public ResponseEntity patchDiary(@PathVariable("diary-id") @Positive @NotNull long diaryId,
                                     @Valid @RequestBody DiaryPatchDto diaryPatchDto) {
        diaryPatchDto.setDiaryId(diaryId);
        Diary diary = diaryMapper.diaryPatchDtoTodiary(diaryPatchDto);
        Diary updatedDiary = diaryService.updateDiary(diary);

        return new ResponseEntity<>((diaryMapper.diaryToDiaryResponseDto(updatedDiary)),HttpStatus.OK);
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
