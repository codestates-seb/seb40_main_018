package project.danim.image.dto;

import lombok.*;
import project.danim.image.domain.Image;
import project.danim.image.domain.ImagePath;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImageResponseDto {

    private Long imageId;

    private String imageName;

    private List<ImagePath> imageFiles;

    public static ImageResponseDto of(Image image) {
        return new ImageResponseDto(image.getImageId(), image.getImageName(), image.getImageFiles());
    }

}
