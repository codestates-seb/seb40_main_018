package project.danim.member.dto;

import lombok.Builder;
import lombok.Getter;
import project.danim.member.domain.Member;

@Getter
public class MemberResponseForProfile {
    private final  Long memberId;
    private final String email;
    private final  String nickname;
    private final String profileImg;
    private final String aboutMe;

    private MemberResponseForProfile(Long memberId, String email, String nickname, String profileImg, String aboutMe){
        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.aboutMe = aboutMe;
    };

    public static MemberResponseForProfile of(Member member) {
        return new MemberResponseForProfile(member.getMemberId(),
                member.getEmail(),
                member.getNickname(),
                member.getProfileImg(),
                member.getAboutMe());
    }
}