package project.danim.likes.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.danim.diary.domain.Diary;
import project.danim.likes.domain.Likes;
import project.danim.member.domain.Member;


import java.util.Optional;


public interface LikesRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByDiaryIdAndMemberId(Long diaryId, Long memberId);
    void delete(Likes likes);
}
