package project.danim.tag.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import project.danim.diary.domain.Diary;
import project.danim.diary.repository.DiaryRepository;
import project.danim.exeption.BusinessLogicException;
import project.danim.exeption.ExceptionCode;
import project.danim.tag.domain.Tag;
import project.danim.tag.dto.TagPatchDto;
import project.danim.tag.dto.TagPostDto;
import project.danim.tag.dto.TagResponseDto;
import project.danim.tag.repository.TagRepository;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    // 태그 전체 조회
//    @Transactional
//    public List<TagResponseDto> findTags(Long diaryId) {
//
//        List<Tag> tags =  tagRepository.findAllByDiary_DiaryId(diaryId);
//
//        return tags.stream()
//                .map(tag -> TagResponseDto.builder()
//                        .content(tag.getContent())
//                        .diaryId(diaryId)
//                        .tagId(tag.getTagId())
//                        .createdAt(tag.getCreatedAt())
//                        .build())
//                .collect(Collectors.toList());
//
//    }

    // 태그 생성
//    @Transactional
//    public TagResponseDto createTag(TagPostDto request, Tag tag, Diary diary) {
//
//        Optional<Diary> OptionalDiary = diaryRepository.findByDiaryId(diary.getDiaryId());
//        Diary findDiary = OptionalDiary.orElseThrow(() -> new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND));
//
//        tag.setDiary(diary);
//        tag.setContent(request.getContent());
//
//        Tag createTag = tagRepository.save(tag);
//
//        return TagResponseDto.builder()
//                .diaryId(diary.getDiaryId())
//                .content(createTag.getContent())
//                .tagId(createTag.getTagId())
//                .createdAt(createTag.getCreatedAt())
//                .build();
//
//    }

    public List<String> getTags(long diaryId) {
        return tagRepository.findAllByDiaryId(diaryId).stream()
                .map(tag -> tag.getContent())
                .collect(Collectors.toList());
    }

    public void createTags(long diaryId, List<String> tags) {
        for (String tag : tags) {
            tagRepository.save(Tag.builder()
                    .diaryId(diaryId)
                    .content(tag)
                    .build());
        }
    }

    public void updateTags(long diaryId, List<String> tags) {
        tagRepository.deleteAllByDiaryId(diaryId);
        for (String tag : tags) {
            tagRepository.save(Tag.builder()
                    .diaryId(diaryId)
                    .content(tag)
                    .build());
        }
    }

    // 태그 수정
//    @Transactional
//    public TagResponseDto updateTag(@Valid @RequestBody TagPatchDto request, Long tagId) {
//
//        Optional<Tag> optionalTag = tagRepository.findById(tagId);
//        Tag findTag = optionalTag.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
//
//        Optional.ofNullable(request.getContent())
//                .ifPresent(content -> findTag.setContent(content));
//
//        Tag updateTag = tagRepository.save(findTag);
//
//        return TagResponseDto.of(updateTag);
//
//    }

    // 태그 삭제
    @Transactional
    public void deleteTag(Long diaryId) {
        tagRepository.deleteAllByDiaryId(diaryId);
    }

}
