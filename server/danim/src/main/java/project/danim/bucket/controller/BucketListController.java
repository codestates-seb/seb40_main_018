package project.danim.bucket.controller;

import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/bucket-list")
public class BucketListController {
    @GetMapping
    public String getBucketList() {
        return "bucket your list!";
    }

    @PostMapping
    public String postBucketList() {
        return "Add complete";
    }

    @PatchMapping("/{bucket-id}")
    public String patchBucketList(@Positive @PathVariable("bucket-id") long bucketId) {
        return "Patch complete";
    }

    @DeleteMapping("/{bucket-id}")
    public String deleteBucketList(@Positive @PathVariable("bucket-id") long bucketId) {
        return "Delete complete";
    }
}
