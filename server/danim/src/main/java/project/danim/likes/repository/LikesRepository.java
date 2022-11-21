package project.danim.likes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.danim.diary.domain.Diary;
import project.danim.likes.domain.Likes;


import java.lang.reflect.Member;
import java.util.Optional;


public interface LikesRepository extends JpaRepository<Likes, Long> {
    // 동일 글에 동일한 계정으로 이미 좋아요 한 내역이 있는지 찾을때 사용할 메소드
    Optional<Likes> findByMemberAndDiary(Member member, Diary diary);
}
