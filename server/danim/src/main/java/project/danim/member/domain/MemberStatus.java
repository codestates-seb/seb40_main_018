package project.danim.member.domain;

import lombok.Getter;

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