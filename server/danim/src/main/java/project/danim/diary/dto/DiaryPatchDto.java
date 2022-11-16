package project.danim.diary.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class DiaryPatchDto {


  private Long diaryId;

  @NotBlank(message = "Patch Title")
  private String title;

  @NotBlank(message = "Patch your Trip")
  private String content;

  /*
   weather 데이터를 어떻게 수정할 것인가?
   */
//  @NotBlank
//  private  int weather;

  //@NotBlank  =? String 일때만 사용 가능
  @NotNull
  private int cost;

  @Builder
  public DiaryPatchDto(String title, String content, int cost){
    this.title = title;
    this.content = content;
    this.cost = cost;
  }
}
