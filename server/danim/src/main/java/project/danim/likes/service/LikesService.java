
package project.danim.likes.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project.danim.diary.domain.Diary;
import project.danim.diary.service.DiaryService;
import project.danim.likes.repository.LikesRepository;
import project.danim.member.domain.Member;

import javax.transaction.Transactional;


@Transactional
@RequiredArgsConstructor
@Service
public class LikesService {

    private final LikesRepository likesRepository;
    private final DiaryService diaryService;

    /*
    //@Transactional(readOnly = true)
    public boolean isNotAlreadyLike(Member member, Diary diary){
        return likesRepository.findByMemberAndDiary(member,diary).isEmpty();
    }

     */

    public boolean addLike(Long memberId, Long diaryId){
        Diary diary = diaryService.findDiary(diaryId);


        return false;

    }
}
