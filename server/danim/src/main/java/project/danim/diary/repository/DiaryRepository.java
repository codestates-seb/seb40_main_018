package project.danim.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.danim.diary.domain.Diary;

import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

    Optional<Diary> findByDiaryId(Long diaryId);

}
