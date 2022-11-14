package project.danim.diary.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.danim.diary.dto.DiaryPostDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;


@RestController
@Validated
@Slf4j
//@EnableJpaAuditing
@RequestMapping("/diary")
public class DiaryController {


    @PostMapping
    public ResponseEntity createDiary(@Valid @RequestBody DiaryPostDto diaryPostDto) {
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{diary-id}")
    public ResponseEntity getDiary(@Positive @PathVariable("diary-id") long diaryId) {

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{diary-id}")
    public ResponseEntity patchDiary(@Positive @PathVariable("diary-id") long diaryId) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{diary-id}")
    public ResponseEntity deleteDiary(@Positive @PathVariable("diary-id") long diaryId) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
