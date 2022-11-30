package project.danim.likes.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;



@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "LIKES")
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    private Long memberId;

    private Long diaryId;


    public Likes(Long diaryId, Long memberId){
        this.diaryId = diaryId;
        this.memberId = memberId;
    }
}
