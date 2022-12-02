package project.danim.tag.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import project.danim.tag.domain.Tag;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findByTagId(Long tagId);

    List<Tag> findAllByDiaryId(long diaryId);

    Page<Tag> findAllByContentContains(String name, Pageable pageable);

    void deleteAllByDiaryId(long diaryId);

//    List<Tag> findAllByDiary_DiaryId(@Param(value = "diaryId") Long diaryId);

}
