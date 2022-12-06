package project.danim.diary.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import project.danim.diary.domain.Diary;
import project.danim.diary.dto.DiaryPatchDto;
import project.danim.diary.dto.DiaryPostDto;
import project.danim.diary.dto.DiaryResponseDto;
import project.danim.diary.mapper.DiaryMapper;
import project.danim.diary.service.DiaryService;
import project.danim.exeption.BusinessLogicException;
import project.danim.exeption.ExceptionCode;
import project.danim.member.domain.Member;
import project.danim.response.MultiResponseDto;
import project.danim.response.SingleResponseDto;
import project.danim.security.memberDetails.MemberDetails;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.IOException;
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
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postDiary(@Valid @RequestPart DiaryPostDto diaryPostDto,
                                    @RequestPart(value = "imgFiles") MultipartFile[] imgFiles) throws IOException {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        DiaryResponseDto postDiary = diaryService.createDiary(diaryPostDto, imgFiles, email);

        return new ResponseEntity<>(new SingleResponseDto<>(postDiary), HttpStatus.CREATED);
    }

    @ApiOperation(value = "특정 Diary 조회", response = Diary.class)
    @GetMapping("/{diary-id}")
    public ResponseEntity getDiary(@Positive @PathVariable("diary-id") @NotNull long diaryId) {
        return new ResponseEntity<>(diaryService.getDiary(diaryId),HttpStatus.OK);
    }

    @ApiOperation(value = "모든 Diary 조회", response = Diary.class)
    @GetMapping
    public ResponseEntity getDiaries(@Positive @RequestParam int size,
                                     @Positive @RequestParam int page) {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return new ResponseEntity<>(diaryService.findDiariesForCard(email, size, page), HttpStatus.OK);
    }

//    @ApiOperation(value = "지역 검색", response = Diary.class)
//    @GetMapping("/search")
//    public ResponseEntity getDiaryCityList(@RequestParam("search") String cityKeyword,
//                                           @Positive @RequestParam int page,
//                                           @Positive @RequestParam int size,
//                                           @RequestParam String sort) {
//        Page<Diary> searchResult = diaryService.diarySearchCityList(cityKeyword, page - 1, size,sort);
//        List<Diary> diaries = searchResult.getContent();
//
//        return new ResponseEntity<>(new MultiResponseDto<>(diaryMapper.diaryToCityResponseDtos(diaries),searchResult),HttpStatus.OK);
//    }



    @GetMapping("/cost")
    public ResponseEntity getDiariesFilterCost(@Positive @RequestParam int min,
                                               @Positive @RequestParam int max,
                                               @Positive @RequestParam int size,
                                               @Positive @RequestParam int page) {
        return new ResponseEntity<>(diaryService.findDiariesFilterCost(min, max, size, page), HttpStatus.OK);
    }

    @ApiOperation(value = "Diary 수정", response = Diary.class)
    @PatchMapping(value = "/{diary-id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity patchDiary(@Positive @NotNull @PathVariable("diary-id") long diaryId,
                                     @Valid @RequestPart(name = "diaryPatchDto") DiaryPatchDto diaryPatchDto,
                                     @RequestPart(name = "imgFiles") MultipartFile[] imgFiles) throws IOException {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return new ResponseEntity<>(new SingleResponseDto<>(diaryService.updateDiary(diaryPatchDto, imgFiles, diaryId, email)),HttpStatus.OK);
    }
/*
    @GetMapping("search")
    public ResponseEntity searchCost(@RequestParam("cost") int cost) {

        return new ResponseEntity<>(diaryService.findDiaries(cost), HttpStatus.OK);
    }
*/
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
