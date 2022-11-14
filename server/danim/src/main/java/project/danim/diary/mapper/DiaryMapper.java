package project.danim.diary.mapper;

import org.mapstruct.Mapper;
import project.danim.diary.domain.Diary;
import project.danim.diary.dto.DiaryPostDto;
import project.danim.diary.dto.DiaryResponseDto;


@Mapper(componentModel = "Spring")
public interface DiaryMapper {


    /*
      MemberId 추가 필요!!  -> PostDto @NotNull 주석 처리 함
     */
    default Diary diaryPostDtoToDiary(DiaryPostDto diaryPostDto){
        Diary diary = new Diary();

        diary.setTitle(diaryPostDto.getTitle());
        diary.setContent(diaryPostDto.getContent());
        diary.setCost(diaryPostDto.getCost());
        return diary;
    }


    default DiaryResponseDto diaryToDiaryResponseDto(Diary diary){
        DiaryResponseDto diaryResponseDto = new DiaryResponseDto();

        diaryResponseDto.setDiaryId(diary.getDiaryId());
        diaryResponseDto.setTitle(diary.getContent());
        diaryResponseDto.setContent(diary.getContent());
        diaryResponseDto.setCost(diary.getCost());

        //diaryResponseDto.setMemberId(diary.getMember().getMemberId());

        return diaryResponseDto;
    }
}
