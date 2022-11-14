package project.danim.diary.service;

import org.springframework.stereotype.Service;
import project.danim.diary.domain.Diary;
import project.danim.diary.repository.DiaryRepository;
import project.danim.exeption.BusinessLogicException;
import project.danim.exeption.ExceptionCode;

import java.util.List;
import java.util.Optional;

@Service
public class DiaryService {
    private final DiaryRepository diaryRepository;

    public DiaryService(DiaryRepository diaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    public Diary createDiary(Diary diary){
        return diaryRepository.save(diary);
    }

    public Diary findVerifiedDiary(long diaryId){
        Optional<Diary> optionalDiary = diaryRepository.findById(diaryId);
        Diary findDiary = optionalDiary.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND));
        return findDiary;
    }

    public Diary findDiary(long diaryId) {
        return findVerifiedDiary(diaryId);
    }

    /*
    모든 다이어리 조회
     */
    public List<Diary> findDiaries() {
        return (List<Diary>) diaryRepository.findAll();
    }


    /*

    다이어리 수정

     */
    public Diary updateDiary(Diary diary){
        Diary findDiary = findVerifiedDiary(diary.getDiaryId()); // 요청된 일기가 DB에 없으면 에러

        Optional.ofNullable(diary.getTitle())
                .ifPresent(diaryTitle -> findDiary.setTitle(diaryTitle));

        Optional.ofNullable(diary.getContent())
                .ifPresent(diaryContent -> findDiary.setContent(diaryContent));

        Optional.ofNullable(diary.getCost())
                .ifPresent(diaryCost -> findDiary.setCost(diaryCost));

        Diary updatedDiarys = diaryRepository.save(findDiary);

        return updatedDiarys;
    }

    /*
    특정 다이어리 삭제
     */
    public void deleteDiary(long diaryId){
        diaryRepository.deleteById(diaryId);
    }





}
