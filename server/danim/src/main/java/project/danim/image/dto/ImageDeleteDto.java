package project.danim.image.dto;

import lombok.Getter;

@Getter
public class ImageDeleteDto {

    private Long imageId;

    public ImageDeleteDto(Long imageId) {
        this.imageId = imageId;
    }

}
