package project.danim.tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import project.danim.tag.domain.Tag;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findByTagId(Long tagId);

    List<Tag> findAllByDiary_DiaryId(@Param(value = "diaryId") Long diaryId);

}
