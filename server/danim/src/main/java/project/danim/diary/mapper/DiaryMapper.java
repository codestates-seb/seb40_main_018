package project.danim.diary.mapper;

import org.mapstruct.Mapper;
import project.danim.diary.domain.Diary;
import project.danim.diary.dto.DiaryPatchDto;
import project.danim.diary.dto.DiaryPostDto;
import project.danim.diary.dto.DiaryResponseDto;
import project.danim.diary.dto.DiaryResponseDtoForCard;

import java.util.List;


@Mapper(componentModel = "Spring")
public interface DiaryMapper {


    /*
      MemberId 추가 필요!!  -> PostDto @NotNull 주석 처리 함
     */
    default Diary diaryPostDtoToDiary(DiaryPostDto diaryPostDto, long memberId){
        Diary diary = new Diary(diaryPostDto.getTitle(),
                diaryPostDto.getQuestion(),
                diaryPostDto.getContent(),
                diaryPostDto.getWeather(),
                diaryPostDto.getArea(),
                diaryPostDto.getCity(),
                diaryPostDto.getCost(),
                0,
                memberId,
                diaryPostDto.getTravelDate());

        return diary;
    }

    default Diary diaryPatchDtoTodiary(DiaryPatchDto diaryPatchDto){
        Diary diary = new Diary();

        diary.setTitle(diaryPatchDto.getTitle());
        diary.setContent(diaryPatchDto.getContent());
        diary.setCost(diaryPatchDto.getCost());

        return diary;
    }

    default DiaryResponseDto diaryToDiaryResponseDto(Diary diary, List<String> tags){
        return DiaryResponseDto.of(diary, tags);
    }

}
