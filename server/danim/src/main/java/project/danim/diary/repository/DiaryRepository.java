package project.danim.diary.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import project.danim.diary.domain.Diary;
import java.util.Optional;
import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    Page<Diary> findByMemberId(Long memberId, Pageable pageable);
    int countByMemberIdAndAreaContains(Long memberId, String area);

    Page<Diary> findAll(Pageable pageable);

    @Query("SELECT d FROM Diary d WHERE d.cost BETWEEN :min and :max")
    Page<Diary> findAllDiaryByCost(@Param("min") int min, @Param("max") int max, Pageable pageable);

    Optional<Diary> findByDiaryId(Long diaryId);
}
