package project.danim.diary.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class DiaryPatchDto {

  // private Long diaryId;

  @NotBlank(message = "Patch Title")
  private String title;

  @NotBlank(message = "Patch your Trip")
  private String content;

  /*
   weather 데이터를 어떻게 수정할 것인가?
   */
  @NotBlank
  private  int weather;

  @NotBlank
  private int cost;

  @Builder
  public DiaryPatchDto(String title, String content, int cost){
    this.title = title;
    this.content = content;
    this.cost = cost;
  }
}
