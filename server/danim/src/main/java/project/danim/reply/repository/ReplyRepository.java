package project.danim.reply.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import project.danim.reply.domain.Reply;

import java.util.List;
import java.util.Optional;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    Optional<Reply> findByReplyId(Long replyId);

    List<Reply> findAllByDiary_DiaryId(@Param(value = "diaryId") Long diaryId);

}
