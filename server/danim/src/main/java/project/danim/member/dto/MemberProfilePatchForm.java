package project.danim.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Setter
@Getter
public class MemberProfilePatchForm {

    @NotNull
    private Long memberId;

    private String nickname;

    private String aboutMe;
}
