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



//  @NotBlank
//  private  String weather;

  @NotNull
  private int cost;

  @Builder
  public DiaryPatchDto(String title, String content, int cost){
    this.title = title;
    this.content = content;
    this.cost = cost;
  }
}
