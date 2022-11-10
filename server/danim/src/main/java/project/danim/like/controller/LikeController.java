package project.danim.like.controller;

import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("like")
public class LikeController {
    @GetMapping("/{dairy-id}")
    public String getLikeMembers(@Positive @PathVariable("dairy-id") long dairyId) {
        return "Like click members!!";
    }

    @PostMapping
    public String postLike() {
        return "I Like this!";
    }
}
