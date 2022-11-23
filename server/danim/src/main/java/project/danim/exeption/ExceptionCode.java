package project.danim.exeption;

import lombok.Getter;

public enum ExceptionCode {

    // 멤버
    MEMBER_NOT_FOUND(404, "회원 정보를 찾을 수 없습니다."),
    MEMBER_EXISTS(409, "회원이 이미 존재합니다."),
    MEMBER_LOGIN_POSSIBLE(303, "모든 정보가 일치하여 로그인 가능합니다."),
    NOT_LOGIN(403, "로그인이 되어있지 않습니다."),

    // 일기
    DIARY_NOT_FOUND(404, "일기가 존재하지 않습니다."),

    // 댓글
    COMMENT_EXIST(409, "존재하는 댓글입니다."),
    COMMENT_NOT_FOUND(404, "댓글을 찾을 수 없습니다."),

    // 태그
    TAG_NOT_FOUND(404, "태그를 찾을 수 없습니다"),

    // 사진 올리기
    INTERNAL_SERVER_ERROR(404, "이미지 업로드에 실패했습니다."),
    BAD_REQUEST(404, "잘못된 형식의 파일"),


    // 체크리스트
    CHECK_LIST_NOT_FOUND(404, "체크 리스트를 찾을 수 없습니다."),

    // 버킷리스트
    BUCKET_LIST_NOT_FOUND(404, "버킷 리스트를 찾을 수 없습니다."),

    ACCESS_FORBIDDEN(403, "접근 권한이 없습니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
