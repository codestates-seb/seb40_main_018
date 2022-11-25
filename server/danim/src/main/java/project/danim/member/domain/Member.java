package project.danim.member.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.danim.audit.BaseTime;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Entity
public class Member extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column
    private String password;

    @Column(length = 20)
    private String nickname;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @Column(nullable = false)
    private String profileImg;

    @Column
    private String aboutMe;

    @Column
    private String refreshToken;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "member_role", joinColumns = @JoinColumn(name = "member_id"))
    private List<String> roles;

    @Builder
    public Member(String email, String password, String nickname, List<String> roles) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.roles = roles;
        this.profileImg = makeDefaultProfileImg();
        this.aboutMe = makeDefaultAboutMe();
    }

    public void changePassword(String currentPwd, String newPwd) {
        if (!this.password.equals(currentPwd)) {
            // 오류 발생하도록
        }

        this.password = newPwd;
    }

    public void changeNickname(String newNickname) {
        this.nickname = newNickname;
    }

    public void updateProfileImg(String newProfileImg) {
        this.profileImg = newProfileImg;
    }

    public void updateAboutMe(String newAboutMe) {
        this.aboutMe = newAboutMe;
    }

    public void saveRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    private String makeDefaultProfileImg() {
        String defaultThumbUrl = "https://cdn.pixabay.com/photo/2019/02/28/04/54/car-4025379_1280.png";
        return defaultThumbUrl;
    }

    private String makeDefaultAboutMe() {
        String defaultAboutMe = "자신을 소개해보세요 :)";
        return defaultAboutMe;
    }

}
