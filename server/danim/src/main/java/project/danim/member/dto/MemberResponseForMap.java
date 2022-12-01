package project.danim.member.dto;

import lombok.Getter;

@Getter
public class MemberResponseForMap {
    int posts;
    String color;

    private MemberResponseForMap(int posts) {
        this.posts = posts;
        this.color = "";
    }

    public static MemberResponseForMap of(int posts) {
        return new MemberResponseForMap(posts);
    }
}
