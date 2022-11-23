package project.danim.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
@NoArgsConstructor
@AllArgsConstructor
//@Setter
public class DiaryPostDto {
/*
    @NotNull
    private Long memberId;
*/
    @NotBlank(message = "Post Title")
    private String title;

    @NotBlank(message = "Post your Trip")
    private String content;

    /*
      weather 데이터를 어떻게 가져올 것인가?
     */
  //  @NotBlank
  //  private String weather;


    @NotNull
    private int cost;

}
