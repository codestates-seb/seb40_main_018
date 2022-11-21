package project.danim.member.adapter.in.web;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.danim.member.application.port.in.MemberQueriesUseCase;
import project.danim.member.application.port.in.request.CreateMemberCommand;
import project.danim.member.application.port.in.CreateMemberUserCase;
import project.danim.member.application.port.in.response.MemberResponseForProfile;
import project.danim.response.SingleResponseDto;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final CreateMemberUserCase createMemberUserCase;
    private final MemberQueriesUseCase memberQueriesUseCase;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Validated MemberCreateForm memberCreateForm) {
        CreateMemberCommand command = new CreateMemberCommand(
                memberCreateForm.getEmail(),
                memberCreateForm.getPassword(),
                memberCreateForm.getNickname()
        );

        createMemberUserCase.createMember(command);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/me")
    public ResponseEntity getMyProfile() {
        // 권한 검사
        String email = "";

        MemberResponseForProfile member = memberQueriesUseCase.getMyProfile(email);

        return new ResponseEntity<>(new SingleResponseDto<>(member), HttpStatus.OK);
    }


}
