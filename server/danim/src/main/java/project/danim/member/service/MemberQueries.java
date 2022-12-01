package project.danim.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import project.danim.diary.domain.Diary;
import project.danim.diary.repository.DiaryRepository;
import project.danim.exeption.ExceptionCode;
import project.danim.member.domain.Member;
import project.danim.member.domain.MemberNotFoundException;
import project.danim.member.dto.MemberResponseForMap;
import project.danim.member.dto.MemberResponseForProfile;
import project.danim.member.dto.MemberResponseForProfileDiaries;
import project.danim.member.repository.MemberRepository;
import project.danim.response.MultiResponseDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberQueries {
    private final MemberRepository memberRepository;
    private final DiaryRepository diaryRepository;

    public MemberResponseForProfile getMyProfile(String email) {

        Member findMember = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberNotFoundException(ExceptionCode.MEMBER_NOT_FOUND));

        return MemberResponseForProfile.of(findMember);
    }

    //일기 대표 이미지 받기까지
    public MultiResponseDto getMyDiaries(String email, int page, int size) {
        Member findMember = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberNotFoundException(ExceptionCode.MEMBER_NOT_FOUND));

        Page<Diary> diaries = diaryRepository.findByMemberId(findMember.getMemberId(), PageRequest.of(page - 1, size, Sort.by("diaryId").descending()));
        List<MemberResponseForProfileDiaries> memberResponseForProfileDiaries = pageToListDiaries(diaries);
        return new MultiResponseDto<>(memberResponseForProfileDiaries, diaries);
    }

    public Map<String, MemberResponseForMap> getMyMap(String email) {
        Member findMember = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberNotFoundException(ExceptionCode.MEMBER_NOT_FOUND));

        List<String> areas = MemberMap.getArea();

        Map<String, MemberResponseForMap> result = new HashMap<>();

        for (String area : areas) {
            int count = diaryRepository.countByMemberIdAndAreaContains(findMember.getMemberId(), area);
            result.put(area, MemberResponseForMap.of(count));
        }

        return result;
    }

    public MemberResponseForProfile getMemberProfile(long memberId) {
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(ExceptionCode.MEMBER_NOT_FOUND));

        return MemberResponseForProfile.of(findMember);
    }

    public MultiResponseDto getMemberProfileDiaries(long memberId, int page, int size) {
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(ExceptionCode.MEMBER_NOT_FOUND));

        Page<Diary> diaries = diaryRepository.findByMemberId(findMember.getMemberId(), PageRequest.of(page - 1, size, Sort.by("diaryId").descending()));
        List<MemberResponseForProfileDiaries> memberResponseForProfileDiaries = pageToListDiaries(diaries);
        return new MultiResponseDto<>(memberResponseForProfileDiaries, diaries);
    }

    private List<MemberResponseForProfileDiaries> pageToListDiaries(Page<Diary> diaries) {
        return diaries.getContent().stream()
                .map(MemberResponseForProfileDiaries::of)
                .collect(Collectors.toList());
    }
}
