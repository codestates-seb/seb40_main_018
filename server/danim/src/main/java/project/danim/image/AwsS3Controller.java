package project.danim.image;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/s3")
public class AwsS3Controller {

    private final FileStore fileStore;

    public AwsS3Controller(FileStore fileStore) {
        this.fileStore = fileStore;
    }

    @PostMapping("/image")
    public ResponseEntity<List<String>> uploadImage(@RequestPart List<MultipartFile> multipartFile) {
        return new ResponseEntity<>(fileStore.uploadImage(multipartFile), HttpStatus.OK);
    }

    @DeleteMapping("/image")
    public ResponseEntity<Void> deleteImage(@RequestParam String fileName) {
        fileStore.deleteImage(fileName);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}