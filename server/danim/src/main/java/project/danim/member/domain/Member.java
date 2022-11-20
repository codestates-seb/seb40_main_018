package project.danim.member.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.danim.audit.BaseTime;

import javax.persistence.*;

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

    @Builder
    public Member(String email, String password, String nickname) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.profileImg = makeDefaultProfileImg();
        this.aboutMe = makeDefaultAboutMe();
    }

    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면 상태"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
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

    private String makeDefaultProfileImg() {
        String defaultThumbUrl = "https://cdn.pixabay.com/photo/2019/02/28/04/54/car-4025379_1280.png";
        return defaultThumbUrl;
    }

    private String makeDefaultAboutMe() {
        String defaultAboutMe = "자신을 소개해보세요 :)";
        return defaultAboutMe;
    }
}
