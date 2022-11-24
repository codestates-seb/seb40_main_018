package project.danim.member.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
public class MemberLoginForm {
    @NotBlank
    @Email
    public String email;

    @NotBlank
    public String password;
}
