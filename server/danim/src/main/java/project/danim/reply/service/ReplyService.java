package project.danim.reply.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import project.danim.diary.domain.Diary;
import project.danim.diary.repository.DiaryRepository;
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
import java.util.stream.Collectors;

@Service
@Transactional
public class ReplyService {

    private final ReplyRepository replyRepository;
    private final DiaryRepository diaryRepository;

    public ReplyService(ReplyRepository replyRepository, DiaryRepository diaryRepository) {
        this.replyRepository = replyRepository;
        this.diaryRepository = diaryRepository;
    }

    // 전체 조회
    public List<ReplyResponseDto> findReplies(Long diaryId) {

        List<Reply> replies =  replyRepository.findAllByDiary_DiaryId(diaryId);

        return replies.stream()
                .map(reply -> ReplyResponseDto.builder()
                        .replyContent(reply.getReplyContent())
                        .diaryId(diaryId)
                        .replyId(reply.getReplyId())
                        .createdAt(reply.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

    }

    // 댓글 생성
    public ReplyResponseDto createReply(ReplyPostDto request ,Reply reply, Diary diary) {

        // TODO 회원 확인 필요

        Optional<Diary> OptionalDiary = diaryRepository.findByDiaryId(diary.getDiaryId());
        Diary findDiary = OptionalDiary.orElseThrow(() -> new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND));

        reply.setDiary(diary);
        reply.setReplyContent(request.getReplyContent());

        Reply createReply = replyRepository.save(reply);

        return ReplyResponseDto.builder()
                .diaryId(diary.getDiaryId())
                .replyContent(createReply.getReplyContent())
                .replyId(createReply.getReplyId())
                .createdAt(createReply.getCreatedAt())
                .responseTo(createReply.getResponseTo())
                .exist(createReply.getExist())
                .build();

    }

    // 댓글 수정
    public ReplyResponseDto updateReply(@Valid @RequestBody ReplyPatchDto request, Long replyId) {

        Optional<Reply> optionalReply = replyRepository.findByReplyId(replyId);
        Reply findReply = optionalReply.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        Optional.ofNullable(request.getReplyContent())
                .ifPresent(replyContent -> findReply.setReplyContent(replyContent));

        Reply updateReply = replyRepository.save(findReply);

        return ReplyResponseDto.of(updateReply);

    }

    // 댓글 삭제
    public void deleteReply(Long replyId) {

        Optional<Reply> findReply = replyRepository.findByReplyId(replyId);

        replyRepository.deleteById(replyId);

    }

}
