package project.danim.check.controller;

import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/check-list")
public class ChecklistController {
    @GetMapping
    public String getChecklist() {
        return "Check your list!";
    }

    @PostMapping
    public String postChecklist() {
        return "Add complete";
    }

    @PatchMapping("/{check-id}")
    public String patchChecklist(@Positive @PathVariable("check-id") long checkId) {
        return "Patch complete";
    }

    @DeleteMapping("/{check-id}")
    public String deleteChecklist(@Positive @PathVariable("check-id") long checkId) {
        return "Delete complete";
    }


}
