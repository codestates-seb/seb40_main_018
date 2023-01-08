package project.danim.diary.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
//@Setter
public class DiaryPostDto {

    @NotBlank(message = "Post Title")
    private String title;

    @NotBlank
    private String weather;

    @NotNull
    private int year;

    @NotNull
    private int month;

    @NotNull
    private int day;

    @NotBlank
    private String question;

    @NotBlank(message = "Post your Trip")
    private String content;

    @NotNull
    private int cost;

    @NotBlank
    private String area;

    @NotBlank
    private String city;

    private List<String> tags;

    public LocalDate getTravelDate() {
        return LocalDate.of(this.year, this.month, this.day);
    }
}
