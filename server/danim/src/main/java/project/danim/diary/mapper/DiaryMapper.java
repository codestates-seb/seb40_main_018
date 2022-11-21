package project.danim.diary.mapper;

import org.mapstruct.Mapper;
import project.danim.diary.domain.Diary;
import project.danim.diary.dto.DiaryPatchDto;
import project.danim.diary.dto.DiaryPostDto;
import project.danim.diary.dto.DiaryResponseDto;
import project.danim.diary.service.DiaryService;


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

    default Diary diaryPatchDtoTodiary(DiaryPatchDto diaryPatchDto){
        Diary diary = new Diary();

        diary.setDiaryId(diaryPatchDto.getDiaryId());
        diary.setTitle(diaryPatchDto.getTitle());
        diary.setContent(diaryPatchDto.getContent());
        diary.setCost(diaryPatchDto.getCost());

        return diary;
    }


    /*
  MemberId 추가 필요!!
 */
    default DiaryResponseDto diaryToDiaryResponseDto(Diary diary){
        DiaryResponseDto diaryResponseDto = new DiaryResponseDto();


        diaryResponseDto.setDiaryId(diary.getDiaryId());
        diaryResponseDto.setTitle(diary.getTitle());
        diaryResponseDto.setContent(diary.getContent());
        diaryResponseDto.setWeather(diary.getWeather());
        diaryResponseDto.setArea(diary.getArea());
        diaryResponseDto.setCost(diary.getCost());
        //diaryResponseDto.setCreatedDate(diary.getCreatedDate());
       // diaryResponseDto.setModifiedDate(diary.getModifiedDate());
        //diaryResponseDto.setMemberId(diary.getMember().getMemberId());

        return diaryResponseDto;
    }

      /*
  MemberId 추가 필요!!
 */
   default DiaryResponseDto diaryToDiaryResponseDtos(Diary diary){

        DiaryResponseDto diaryResponseDto = new DiaryResponseDto();
        diaryResponseDto.setDiaryId(diary.getDiaryId());
        diaryResponseDto.setTitle(diary.getTitle());
        diaryResponseDto.setContent(diary.getContent());
        diaryResponseDto.setWeather(diary.getWeather());
        diaryResponseDto.setArea(diary.getArea());
        diaryResponseDto.setCost(diary.getCost());
       // diaryResponseDto.setCreatedDate(diary.getCreatedDate());
      //  diaryResponseDto.setModifiedDate(diary.getModifiedDate());
        //diaryResponseDto.setMemberId(diary.getMember().getMemberId());

        return diaryResponseDto;
    }


}
