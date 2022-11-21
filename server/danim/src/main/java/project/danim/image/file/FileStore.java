package project.danim.image.file;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import project.danim.image.domain.Attachment;
import project.danim.image.repository.AttachmentType;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class FileStore {

    // 이 경로에 저장 -> S3로 바꾸면 변경 필요
    @Value("${file.dir}/")
    private String fileDirPath;

    public String createPath(String storeFilename, AttachmentType attachmentType) {
        String viaPath = (attachmentType == AttachmentType.IMAGE) ? "images/" : "generals/";
        return fileDirPath + viaPath + storeFilename;
    }

    // 이미지 1개 저장
    public Attachment storeFile(MultipartFile multipartFile, AttachmentType attachmentType) throws IOException {
        if (multipartFile.isEmpty()) {
            return null;
        }

        String originalFilename = multipartFile.getOriginalFilename();
        String storeFilename = createStoreFilename(originalFilename);

        multipartFile.transferTo(new File(createPath(storeFilename, attachmentType)));

        return Attachment.builder()
                .originFilename(originalFilename)
                .storeFilename(storeFilename)
                .attachmentType(attachmentType)
                .build();
    }

    // 파일 전체 조회
    // diaryId 가져오고 거기서 image 전체 가져옴
    // imageId -> diaryId 변경 필요
    public List<Attachment> storeFiles(List<MultipartFile> multipartFiles, AttachmentType attachmentType) throws IOException {

        List<Attachment> attachments = new ArrayList<>();

        for (MultipartFile multipartFile : multipartFiles) {

            if (!multipartFile.isEmpty()) {
                attachments.add(storeFile(multipartFile, attachmentType));
            }
        }

        return attachments;
    }

    private String extractExt(String originalFilename) {
        int idx = originalFilename.lastIndexOf(".");
        String ext = originalFilename.substring(idx);

        return ext;
    }

    private String createStoreFilename(String originalFilename) {
        String uuid = UUID.randomUUID().toString();
        String ext = extractExt(originalFilename);
        String storeFilename = uuid + ext;

        return storeFilename;
    }

}
