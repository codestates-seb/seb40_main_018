package project.danim.image.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.danim.image.domain.ImagePath;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ImagePatchDto {

    private String imageName;

    private List<ImagePath> imageFiles;

}