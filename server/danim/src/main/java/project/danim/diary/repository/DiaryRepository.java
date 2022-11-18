package project.danim.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.danim.diary.domain.Diary;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
}
