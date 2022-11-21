package project.danim.image.controller;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class DiaryAddForm {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    private List<MultipartFile> imageFiles;
    private List<MultipartFile> generalFiles;

    @Builder
    public DiaryAddForm(String title, String content, List<MultipartFile> imageFiles, List<MultipartFile> generalFiles) {
        this.title = title;
        this.content = content;
        this.imageFiles = (imageFiles != null) ? imageFiles : new ArrayList<>();
        this.generalFiles = (generalFiles != null) ? generalFiles : new ArrayList<>();
    }


}
