package project.danim.diary.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import project.danim.diary.domain.Diary;
import project.danim.diary.dto.DiaryPostDto;
import project.danim.diary.dto.DiaryResponseDto;
import project.danim.diary.mapper.DiaryMapper;
import project.danim.diary.repository.DiaryRepository;
import project.danim.exeption.BusinessLogicException;
import project.danim.exeption.ExceptionCode;
import project.danim.member.domain.Member;
import project.danim.member.repository.MemberRepository;
import project.danim.member.service.MemberService;
import project.danim.member.service.MemberServiceHelper;
import project.danim.response.MultiResponseDto;


import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final DiaryMapper diaryMapper;

    private final MemberService memberService;

    public DiaryService(DiaryRepository diaryRepository, DiaryMapper diaryMapper, MemberService memberService) {
        this.diaryRepository = diaryRepository;
        this.diaryMapper = diaryMapper;
        this.memberService = memberService;
    }

    public DiaryResponseDto createDiary(DiaryPostDto diaryPostDto, String email){
        Member findMember = memberService.findMember(email);
        Diary newDiary = diaryMapper.diaryPostDtoToDiary(diaryPostDto, findMember.getMemberId());

        Diary diary = diaryRepository.save(newDiary);

        return diaryMapper.diaryToDiaryResponseDto(diary);
    }

    private Diary findVerifiedDiary(long diaryId) {

        Optional<Diary> optionalDiary = diaryRepository.findById(diaryId);
        Diary findDiary = optionalDiary.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND));
        return findDiary;
    }

    /*
     예외 처리
     */
    public Diary findDiary(long diaryId) {
        return findVerifiedDiary(diaryId);
    }

    public DiaryResponseDto getDiary(long diaryId) {
        Diary findDiary = findVerifiedDiary(diaryId);

        return diaryMapper.diaryToDiaryResponseDto(findDiary);
    }

    /*
    모든 다이어리 조회
     */
    public MultiResponseDto findDiaries(int size, int page) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("diaryId").descending());
        Page<Diary> diaryPage = diaryRepository.findAll(pageable);
        List<DiaryResponseDto> diaries = diaryPage.getContent().stream()
                .map(diary -> diaryMapper.diaryToDiaryResponseDto(diary))
                .collect(Collectors.toList());

        return new MultiResponseDto<>(diaries, diaryPage);
    }
    public MultiResponseDto findDiariesFilterCost(int min, int max, int size, int page) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("diaryId").descending());
        Page<Diary> diaryPage = diaryRepository.findAllDiaryByCost(min, max, pageable);

        List<DiaryResponseDto> diaries = diaryPage.getContent().stream()
                .map(diary -> diaryMapper.diaryToDiaryResponseDto(diary))
                .collect(Collectors.toList());

        return new MultiResponseDto<>(diaries, diaryPage);
    }

    public void savedLikesCount(Diary diary) {

        diaryRepository.save(diary);
    }

    /*
    다이어리 수정
     */
    public Diary updateDiary(Diary diary) {

        Diary findDiary = findVerifiedDiary(diary.getDiaryId()); // 요청된 일기가 DB에 없으면 에러
        //diaryRepository.findById(diaryId);

        Optional.ofNullable(diary.getTitle())
                .ifPresent(diaryTitle -> findDiary.setTitle(diaryTitle));

        Optional.ofNullable(diary.getContent())
                .ifPresent(diaryContent -> findDiary.setContent(diaryContent));

        Optional.ofNullable(diary.getCost())
                .ifPresent(diaryCost -> findDiary.setCost(diaryCost));

        //  findDiary.setModifiedDate(LocalDateTime.now());

        Diary updatedDiaries = diaryRepository.save(findDiary);

        return updatedDiaries;
    }

//    default List<DiaryResponseDto> diaryToDiaryResponseDtos(List<Diary> diary){
//
//        List<DiaryResponseDto> diaryResponseDtos =diary.stream().map(diary -> answerToAnswerResponseDto(answer)).collect(Collectors.toList());
//
//
//        return answerResponseDtos;
//    };

    /*
    특정 다이어리 삭제
     */
    public void deleteDiary(long diaryId) {
        diaryRepository.deleteById(diaryId);
    }

}