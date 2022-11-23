package project.danim.reply.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import project.danim.exeption.BusinessLogicException;
import project.danim.exeption.ExceptionCode;
import project.danim.reply.domain.Reply;
import project.danim.reply.dto.ReplyPatchDto;
import project.danim.reply.dto.ReplyPostDto;
import project.danim.reply.dto.ReplyResponseDto;
import project.danim.reply.repository.ReplyRepository;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReplyService {

    private final ReplyRepository replyRepository;

    public ReplyService(ReplyRepository replyRepository) {
        this.replyRepository = replyRepository;
    }

    // 전체 조회
    public List<Reply> findReplies() {
        return replyRepository.findAll();
    }

    // 체크리스트 생성
    public ReplyResponseDto createReply(@Valid @RequestBody ReplyPostDto request) {

        // TODO 회원 확인 필요

        Reply reply = Reply.builder()
                .replyContent(request.getReplyContent())
                .build();

        Reply createdBucket = replyRepository.save(reply);

        return ReplyResponseDto.of(createdBucket);

    }

    // 체크리스트 수정
    public ReplyResponseDto updateReply(@Valid @RequestBody ReplyPatchDto request, Long replyId) {

        Optional<Reply> optionalReply = replyRepository.findByReplyId(replyId);
        Reply findReply = optionalReply.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        Optional.ofNullable(request.getReplyContent())
                .ifPresent(replyContent -> findReply.setReplyContent(replyContent));

        Reply updateReply = replyRepository.save(findReply);

        return ReplyResponseDto.of(updateReply);

    }

    // 체크리스트 삭제
    public void deleteReply(Long replyId) {

        Optional<Reply> findReply = replyRepository.findByReplyId(replyId);

        replyRepository.deleteById(replyId);

    }

}
