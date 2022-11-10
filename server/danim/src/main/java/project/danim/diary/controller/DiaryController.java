package project.danim.diary.controller;

import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/diary")
public class DiaryController {
    @PostMapping
    public String createDiary() {
        return "Diary Post";
    }

    @GetMapping("/{diary-id}")
    public String getDiary(@Positive @PathVariable("diary-id") long diaryId) {
        return "Diary Get!";
    }

    @PatchMapping("/{diary-id}")
    public String patchDiary(@Positive @PathVariable("diary-id") long diaryId) {
        return diaryId + " Diary Patch!";
    }

    @DeleteMapping("/{diary-id}")
    public String deleteDiary(@Positive @PathVariable("diary-id") long diaryId) {
        return diaryId + " Diary Delete!";
    }
}
