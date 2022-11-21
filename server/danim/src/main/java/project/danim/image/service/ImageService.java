//package project.danim.image.service;
//
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//import project.danim.image.domain.Attachment;
//import project.danim.image.file.FileStore;
//import project.danim.image.repository.AttachmentType;
//import project.danim.image.repository.ImageRepository;
//
//import java.io.IOException;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//import java.util.stream.Stream;
//
//public interface ImageService {
//
//    private final ImageRepository imageRepository;
//    private final FileStore fileStore;
//
//    public List<Attachment> saveAttachments(Map<AttachmentType, List<MultipartFile>> multipartFileListMap) throws IOException{
//        List<Attachment> imageFiles = fileStore.storeFiles(multipartFileListMap.get(AttachmentType.IMAGE), AttachmentType.IMAGE);
//        List<Attachment> generalFiles = fileStore.storeFiles(multipartFileListMap.get(AttachmentType.GENERAL), AttachmentType.GENERAL);
//        List<Attachment> result = Stream.of(imageFiles, generalFiles)
//                .flatMap(f -> f.stream())
//                .collect(Collectors.toList());
//
//        return result;
//    }
//
//
//
//}