
package project.danim.likes.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project.danim.diary.domain.Diary;
import project.danim.diary.repository.DiaryRepository;
import project.danim.diary.service.DiaryService;
import project.danim.likes.domain.Likes;
import project.danim.likes.repository.LikesRepository;
import project.danim.member.domain.Member;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;


@Transactional
@RequiredArgsConstructor
@Service
public class LikesService {

    private final LikesRepository likesRepository;
    private final DiaryService diaryService;

    public boolean booleanLike(Long memberId, Long diaryId){

        Diary diary = diaryService.findDiary(diaryId);

        if(isNotAlreadyLike(memberId,diaryId)) {
            diary.setLikesCount(diary.getLikesCount()+1);
            likesRepository.save(new Likes(memberId,diaryId));
            diaryService.savedLikesCount(diary);
            return true;
        }
        else {
            diary.setLikesCount(diary.getLikesCount()-1);
            likesRepository.delete(findLikes(memberId, diaryId));
            diaryService.savedLikesCount(diary);
        }
        return false;
    }

    public boolean isNotAlreadyLike(Long memberId, Long diaryId) {
        return likesRepository.findByMemberIdAndDiaryId(memberId, diaryId).isEmpty();
    }

    public Likes findLikes(Long memberId, Long diaryId){
        return likesRepository.findByMemberIdAndDiaryId(memberId, diaryId).orElse(null);
    }



}


    //@Transactional(readOnly = true)

