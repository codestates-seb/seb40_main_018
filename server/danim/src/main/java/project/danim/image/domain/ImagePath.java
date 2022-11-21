package project.danim.image.domain;

import lombok.*;

import javax.persistence.*;

// 업로드 파일 경로 보관 용도
@Data
public class ImagePath {

    private String upLodFileName;   // 사용자 업로드 파일명
    private String storeFileName;   // 내부 저장 파일명

    // 다른 사용자와 저장명이 겹치지 않게 내부의 별도 파일명이 필요

    public ImagePath(String upLodFileName, String storeFileName) {
        this.upLodFileName = upLodFileName;
        this.storeFileName = storeFileName;
    }

}
