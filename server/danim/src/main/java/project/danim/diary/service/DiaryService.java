package project.danim.diary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import project.danim.diary.domain.Diary;
import project.danim.diary.dto.DiaryResponseDto;
import project.danim.diary.repository.DiaryRepository;
import project.danim.exeption.BusinessLogicException;
import project.danim.exeption.ExceptionCode;
import project.danim.image.AwsS3Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class DiaryService {
    private final DiaryRepository diaryRepository;

    private final AwsS3Service awsS3Service;

    public DiaryService(DiaryRepository diaryRepository, AwsS3Service awsS3Service) {
        this.diaryRepository = diaryRepository;
        this.awsS3Service = awsS3Service;
    }

    public Diary createDiary(Diary diary) {
        return diaryRepository.save(diary);
    }

    public Diary findVerifiedDiary(long diaryId) {
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

    /*
    모든 다이어리 조회
     */
    public List<Diary> findDiaries() {
        return (List<Diary>) diaryRepository.findAll();
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

    public Long keepDiary(MultipartFile image, Diary diary) throws IOException {

        if (!image.isEmpty()) {
            String storedFileName = awsS3Service.upload(image, "images");
            diary.setImageUrl(storedFileName);
        }

        Diary savedDiary = diaryRepository.save(diary);

        return savedDiary.getDiaryId();

    }
}