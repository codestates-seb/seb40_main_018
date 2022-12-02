package project.danim.S3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional
public class S3Service {

    private final AmazonS3 amazonS3;
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    //TODO 10개 제한
    public List<String> uploadDiaryImages(MultipartFile[] multipartFileList, String dirName) throws IOException {

        List<String> imagePathList = new ArrayList<>();

        for(MultipartFile multipartFile: multipartFileList) {

            String originalName = dirName + "/" + multipartFile.getOriginalFilename(); // 파일 이름
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

        return imagePathList;
    }

    public List<String> updateDiaryImages(List<String> savedImageList, MultipartFile[] multipartFiles, String dirName) throws IOException {
        for (String imageUrl : savedImageList) {
            String path = imageUrl.replace("https://be-danim-bucket.s3.ap-northeast-2.amazonaws.com/", "");
            path = URLDecoder.decode(path, StandardCharsets.UTF_8);
            amazonS3.deleteObject(bucket, path);
        }

        return uploadDiaryImages(multipartFiles, dirName);
    }

    public void deleteDiaryImages(List<String> savedImageList) {
        for (String imageUrl : savedImageList) {
            String path = imageUrl.replace("https://be-danim-bucket.s3.ap-northeast-2.amazonaws.com/", "");
            path = URLDecoder.decode(path, StandardCharsets.UTF_8);
            amazonS3.deleteObject(bucket, path);
        }
    }

    public String uploadProfileImage(MultipartFile profileImage) throws IOException {

        String originalName = "profile/" + profileImage.getOriginalFilename(); // 파일 이름
        long size = profileImage.getSize(); // 파일 크기

        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(profileImage.getContentType());
        objectMetaData.setContentLength(size);

        // S3에 업로드
        amazonS3Client.putObject(
                new PutObjectRequest(bucket, originalName, profileImage.getInputStream(), objectMetaData)
                        .withCannedAcl(CannedAccessControlList.PublicRead)
        );

        String imagePath = amazonS3Client.getUrl(bucket, originalName).toString(); // 접근가능한 URL 가져오기

        return imagePath;
    }
    public String updateProfileImage(String profileImageUrl, MultipartFile profileImage) throws IOException {
        if (profileImage == null) {
            return "https://cdn.pixabay.com/photo/2019/02/28/04/54/car-4025379_1280.png";
        }
        if (!profileImageUrl.equals("https://cdn.pixabay.com/photo/2019/02/28/04/54/car-4025379_1280.png")) {
            String path = profileImageUrl.replace("https://be-danim-bucket.s3.ap-northeast-2.amazonaws.com/", "");
            path = URLDecoder.decode(path, StandardCharsets.UTF_8);

            amazonS3.deleteObject(bucket, path);
        }

        return uploadProfileImage(profileImage);
    }
}
