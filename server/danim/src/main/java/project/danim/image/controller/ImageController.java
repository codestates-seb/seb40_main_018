//package project.danim.image.controller;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.mvc.support.RedirectAttributes;
//import project.danim.image.domain.Image;
//import project.danim.image.domain.ImagePath;
//import project.danim.image.file.FileStore;
//import project.danim.image.repository.ImageRepository;
//
//import java.io.IOException;
//import java.util.List;
//
//@Slf4j
//@RestController
//public class ImageController {
//
//    private final ImageRepository imageRepository;
//    private final FileStore fileStore;
//
//    public ImageController(ImageRepository imageRepository, FileStore fileStore) {
//        this.imageRepository = imageRepository;
//        this.fileStore = fileStore;
//    }
//
//    // 등록 폼
//    @GetMapping("/images/new")
//    public String newImage(@ModelAttribute ImageForm form) {
//        return "item-form";
//    }
//
//    // 폼의 데이터 저장 -> 보여주는 화면으로 리다이렉트
//    @PostMapping("/images/new")
//    public String saveImage(@ModelAttribute ImageForm form, RedirectAttributes redirectAttributes) throws IOException {
//
////        ImagePath attachFile = imageService.storeFile(form.getAttachFile());
//
//        List<ImagePath> storeImageFiles = fileStore.saveImages(form.getImageFiles());
//
//        // DB에 저장   -> S3에 저장
//        Image image = new Image();
//
//        image.setImageName(form.getImageName());
//        image.setImageFiles(storeImageFiles);
////        image.setAttachFile(attachFile);
//
//        imageRepository.save(image);
//
//        redirectAttributes.addAttribute("imageId", image.getImageId());
//
//        return "redirect:/images/{imageId}";
//
//    }
//
//    // 상품을 보여줌
////    @GetMapping("/images/{image-id}")
////    public String images(@PathVariable Long imageId, Model model) {
////
////        Optional<Image> image = imageRepository.findByImageId(imageId);
////
////        model.addAttribute("image", image);
////
////        return "image-view";    // 조회 html
////
////    }
//
//    // <img> 태그로 이미지를 조회할 때 사용한다. UrlResource
//    // 이미지 파일을 읽어서 @ResponseBody 로 이미지 바이너리를 반환
////    @ResponseBody
////    @GetMapping("/images/{fileName}")
////    public Resource downloadImage(@PathVariable String filename) throws MalformedURLException {
////        return new UrlResource("file:" + imageService.getFullPath(filename));
////    }
//
//}
