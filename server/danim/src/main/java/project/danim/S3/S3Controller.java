package project.danim.S3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.danim.diary.domain.Diary;
import project.danim.diary.service.DiaryService;
import project.danim.reply.domain.Reply;
import project.danim.reply.dto.ReplyResponseDto;
import project.danim.response.SingleResponseDto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/s3")
public class S3Controller {

//    private final S3Service s3Service;
    private final AmazonS3 amazonS3;
    private final AmazonS3Client amazonS3Client;
    private final DiaryService diaryService;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

//    @GetMapping("/{diary-id}")
//    public ResponseEntity<Object> getImages(@PathVariable("diary-id") Long diaryId, MultipartFile[] multipartFileList) throws IOException {
//
//
//
//    }

    //TODO 10개 제한
    @PostMapping("/{diary-id}")
    public ResponseEntity<Object> upload(@PathVariable("diary-id") Long diaryId, MultipartFile[] multipartFileList) throws IOException {

        Diary diary = diaryService.findDiary(diaryId);

        List<String> imagePathList = new ArrayList<>();

        for(MultipartFile multipartFile: multipartFileList) {

            String originalName = multipartFile.getOriginalFilename(); // 파일 이름
            long size = multipartFile.getSize(); // 파일 크기

            ObjectMetadata objectMetaData = new ObjectMetadata();
            objectMetaData.setContentType(multipartFile.getContentType());
            objectMetaData.setContentLength(size);

            // S3에 업로드
            amazonS3Client.putObject(
                    new PutObjectRequest(bucket, originalName, multipartFile.getInputStream(), objectMetaData)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );

            String imagePath = amazonS3Client.getUrl(bucket, originalName).toString(); // 접근가능한 URL 가져오기
            imagePathList.add(imagePath);
        }

        return new ResponseEntity<Object>(imagePathList, HttpStatus.OK);
    }

    @DeleteMapping("/image")
    public void deleteImage(@RequestParam String fileName) {

        amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));

    }

}
