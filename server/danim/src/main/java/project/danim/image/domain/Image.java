package project.danim.image.domain;

import lombok.*;

import javax.persistence.*;
import java.util.List;

// 업로드 파일 보관 용도
@Data
public class Image {

    private Long imageId;

    private String imageName;

//    private ImagePath attachFile;

    private List<ImagePath> imageFiles;

    // 멤버, 일기 필드 필요
    // 멤버id와 일기id를 알고 있으면 사진 이름이 필요없을까??

}
