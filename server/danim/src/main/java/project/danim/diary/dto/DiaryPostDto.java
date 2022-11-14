package project.danim.diary.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class DiaryPostDto {

    @Positive
    @NotNull
    private Long memberId;

    @NotBlank(message = "Post Title")
    private String title;

    @NotBlank(message = "Post your Trip")
    private String content;

    /*
      weather 데이터를 어떻게 가져올 것인가?
     */
    @NotBlank
    private  int weather;


    @NotBlank
    private int cost;

}
