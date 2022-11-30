package project.danim.tag.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.danim.diary.domain.Diary;
import project.danim.diary.service.DiaryService;
import project.danim.response.SingleResponseDto;
import project.danim.tag.domain.Tag;
import project.danim.tag.dto.TagDeleteDto;
import project.danim.tag.dto.TagPatchDto;
import project.danim.tag.dto.TagPostDto;
import project.danim.tag.dto.TagResponseDto;
import project.danim.tag.service.TagService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/tag")
public class TagController {

    private final TagService tagService;

    private final DiaryService diaryService;

    public TagController(TagService tagService, DiaryService diaryService) {
        this.tagService = tagService;
        this.diaryService = diaryService;
    }

    // 1개 일기의 태그 전체 조회
    @GetMapping("/{diary-id}")
    public ResponseEntity<SingleResponseDto> getTags(@PathVariable("diary-id") Long diaryId) {

        return new ResponseEntity<>(new SingleResponseDto<>(tagService.findTags(diaryId)), HttpStatus.OK);

    }

    // 태그 생성
    @PostMapping("/{diary-id}")
    public ResponseEntity<SingleResponseDto> postTag(@Valid @RequestBody TagPostDto request,
                                                       @PathVariable("diary-id") Long diaryId,
                                                       Tag tag) {

        Diary diary = diaryService.findDiary(diaryId);

        TagResponseDto response = tagService.createTag(request, tag, diary);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED);

    }

    // 태그 수정
    @PatchMapping("/{tag-id}")
    public ResponseEntity patchTag(@PathVariable("tag-id") Long tagId,
                                   @RequestBody TagPatchDto request) {

        TagResponseDto response = tagService.updateTag(request, tagId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);
    }

    // 태그 삭제
    @DeleteMapping("/{tag-id}")
    public ResponseEntity deleteTag(@PathVariable("tag-id") @Positive Long tagId) {

        tagService.deleteTag(tagId);

        return new ResponseEntity<>(new TagDeleteDto(tagId), HttpStatus.OK);

    }

}