package project.danim.diary.service;


import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import project.danim.S3.S3Service;
import project.danim.diary.domain.Diary;
import project.danim.diary.dto.DiaryPatchDto;
import project.danim.diary.dto.DiaryPostDto;
import project.danim.diary.dto.DiaryResponseDto;
import project.danim.diary.dto.DiaryResponseDtoForCard;
import project.danim.diary.mapper.DiaryMapper;
import project.danim.diary.repository.DiaryRepository;
import project.danim.exeption.BusinessLogicException;
import project.danim.exeption.ExceptionCode;
import project.danim.likes.domain.Likes;
import project.danim.likes.repository.LikesRepository;
import project.danim.member.domain.Member;
import project.danim.member.repository.MemberRepository;
import project.danim.member.service.MemberService;
import project.danim.member.service.MemberServiceHelper;
import project.danim.response.MultiResponseDto;
import project.danim.response.SingleResponseDto;
import project.danim.tag.service.TagService;


import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final DiaryMapper diaryMapper;
    private final MemberService memberService;
    private final S3Service s3Service;
    private final TagService tagService;
    private final LikesRepository likesRepository;

    public DiaryService(DiaryRepository diaryRepository, DiaryMapper diaryMapper, MemberService memberService, TagService tagService, S3Service s3Service, LikesRepository likesRepository) {
        this.diaryRepository = diaryRepository;
        this.diaryMapper = diaryMapper;
        this.memberService = memberService;
        this.tagService = tagService;
        this.s3Service = s3Service;
        this.likesRepository = likesRepository;
    }

    public DiaryResponseDto createDiary(DiaryPostDto diaryPostDto, MultipartFile[] diaryImages, String email) throws IOException {
        Member findMember = memberService.findMember(email);
        Diary newDiary = diaryMapper.diaryPostDtoToDiary(diaryPostDto, findMember.getMemberId());
        List<String> imgUrls = s3Service.uploadDiaryImages(diaryImages, "diary");
        newDiary.addDiaryImages(imgUrls);

        Diary diary = diaryRepository.save(newDiary);

        tagService.createTags(diary.getDiaryId(), diaryPostDto.getTags());

        return diaryMapper.diaryToDiaryResponseDto(diary, diaryPostDto.getTags());
    }

    private Diary findVerifiedDiary(long diaryId) {

        Optional<Diary> optionalDiary = diaryRepository.findByDiaryId(diaryId);
        Diary findDiary = optionalDiary.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND));
        return findDiary;
    }

    /*
     예외 처리
     */
    public Diary findDiary(long diaryId) {
        return findVerifiedDiary(diaryId);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public SingleResponseDto getDiary(long diaryId) {
        Diary findDiary = findVerifiedDiary(diaryId);
        DiaryResponseDto diaryResponseDto = DiaryResponseDto.of(findDiary, tagService.getTags(diaryId));
//        log.info(diaryResponseDto.getDiaryImages().toString());
        return new SingleResponseDto<>(diaryResponseDto);
    }

    /*
    모든 다이어리 조회
     */
    public MultiResponseDto findDiaries(int size, int page) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("diaryId").descending());
        Page<Diary> diaryPage = diaryRepository.findAll(pageable);
        List<DiaryResponseDto> diaries = diaryPage.getContent().stream()
                .map(diary -> diaryMapper.diaryToDiaryResponseDto(diary, tagService.getTags(diary.getDiaryId())))
                .collect(Collectors.toList());

        return new MultiResponseDto<>(diaries, diaryPage);
    }

    public MultiResponseDto findDiariesForCard(String email, int size, int page) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("diaryId").descending());
        Page<Diary> diaryPage = diaryRepository.findAll(pageable);

        List<DiaryResponseDtoForCard> diaries = diaryPage.getContent().stream()
                .map(diary -> {
                    boolean isLike = false;
                    if (!email.equals("anonymousUser")) {
                        Member findMember = memberService.findMember(email);
                        Likes findLike = likesRepository.findByDiaryIdAndMemberId(diary.getDiaryId(), findMember.getMemberId()).orElse(null);

                        if (findLike != null) {
                            isLike = true;
                        }
                    }
                    return DiaryResponseDtoForCard.of(diary, isLike, memberService.findMember(diary.getMemberId()), tagService.getTags(diary.getDiaryId()));
                })
                .collect(Collectors.toList());

        return new MultiResponseDto<>(diaries, diaryPage);
    }

    public MultiResponseDto findDiariesFilterCost(int min, int max, int size, int page) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("diaryId").descending());
        Page<Diary> diaryPage = diaryRepository.findAllDiaryByCost(min, max, pageable);

        List<DiaryResponseDto> diaries = diaryPage.getContent().stream()
                .map(diary -> diaryMapper.diaryToDiaryResponseDto(diary, tagService.getTags(diary.getDiaryId())))
                .collect(Collectors.toList());

        return new MultiResponseDto<>(diaries, diaryPage);
    }

    public Page<Diary> diarySearchCityList(String cityKeyword, int page, int size, String sort){
        PageRequest pageRequest =PageRequest.of(page,size,Sort.by(sort).descending());
        List<Diary> searchResult = diaryRepository.findByCityContaining(cityKeyword);

        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), searchResult.size());
        Page<Diary> serchCity = new PageImpl<>(searchResult.subList(start, end), pageRequest, searchResult.size());
        return serchCity;
    }

    public void savedLikesCount(Diary diary) {

        diaryRepository.save(diary);
    }

    /*
    다이어리 수정
     */
    public DiaryResponseDto updateDiary(DiaryPatchDto diaryPatchDto, MultipartFile[] diaryImages, long diaryId, String email) throws IOException {
        Member loginMember = memberService.findMember(email);
        Diary findDiary = findVerifiedDiary(diaryId);
        if (findDiary.getMemberId() != loginMember.getMemberId()) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN, "로그인한 사용자와 다이어리 작성자가 다릅니다.");
        }


        findDiary.updateDiary(diaryPatchDto.getTitle(),
                diaryPatchDto.getContent(),
                diaryPatchDto.getWeather(),
                diaryPatchDto.getArea(),
                diaryPatchDto.getCity(),
                diaryPatchDto.getCost(),
                diaryPatchDto.getTravelDate()
        );

        tagService.updateTags(findDiary.getDiaryId(), diaryPatchDto.getTags());

        List<String> updateDiaryImages = s3Service.updateDiaryImages(findDiary.getDiaryImages(), diaryImages, "diary");
        findDiary.addDiaryImages(updateDiaryImages);

        Diary updatedDiaries = diaryRepository.save(findDiary);



        return diaryMapper.diaryToDiaryResponseDto(updatedDiaries, tagService.getTags(diaryId));
    }

    /*
    특정 다이어리 삭제
     */
    public void deleteDiary(long diaryId) {
        Diary findDiary = findVerifiedDiary(diaryId);
        s3Service.deleteDiaryImages(findDiary.getDiaryImages());
        tagService.deleteTag(diaryId);
        diaryRepository.delete(findDiary);
    }

}