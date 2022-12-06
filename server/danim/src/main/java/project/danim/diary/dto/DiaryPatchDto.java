package project.danim.diary.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class DiaryPatchDto {
  @NotNull
  private long memberId;

  @NotBlank
  private String title;

  @NotBlank
  private String content;

  @NotNull
  private Integer year;

  @NotNull
  private Integer month;

  @NotNull
  private Integer day;

  @NotBlank
  private String weather;

  @NotNull
  private int cost;

  @NotBlank
  private String area;

  @NotBlank
  private String city;

  @NotNull
  private List<String> tags;

  public LocalDate getTravelDate() {
    return LocalDate.of(year, month, day);}
}
