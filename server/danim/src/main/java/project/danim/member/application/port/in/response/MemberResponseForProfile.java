package project.danim.member.application.port.in.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
public class MemberResponseForProfile {
    private Long memberId;
    private String email;
    private String nickname;
    private String profileImg;
    private String aboutMe;

}
