package project.danim.image;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.danim.diary.domain.Diary;
import project.danim.diary.service.DiaryService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/s3")
public class AwsS3Controller {

    private final DiaryService diaryService;

    @ResponseBody
    @PostMapping(value = "/diary/new", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Long saveDiary(HttpServletRequest request, @RequestParam(value="image") MultipartFile image, Diary diary) throws IOException {

        Long diaryId = diaryService.keepDiary(image, diary);

        return diaryId;

    }

}