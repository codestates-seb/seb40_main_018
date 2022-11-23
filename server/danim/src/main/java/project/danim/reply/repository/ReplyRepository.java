package project.danim.reply.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.danim.reply.domain.Reply;

import java.util.Optional;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    Optional<Reply> findByReplyId(Long replyId);

}
