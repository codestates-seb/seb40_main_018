package project.danim.image.controller;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

// 저장용 폼
@Data
public class ImageForm {

    private Long imageId;
    private String imageName;
    private List<MultipartFile> imageFiles; // 다중 업로드 위해
//    private MultipartFile attachFile;

}
