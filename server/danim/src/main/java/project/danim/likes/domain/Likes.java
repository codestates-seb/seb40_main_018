package project.danim.likes.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.danim.diary.domain.Diary;
import project.danim.member.domain.Member;

import javax.persistence.*;
import javax.validation.constraints.Positive;



@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "LIKES")
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Likes_ID;




    //@ManyToOne   // (1)
    //@JoinColumn(name = "MEMBER_ID", nullable = false )  // (2)
    private Long memberId;


   // @ManyToOne
   // @JoinColumn(name = "Diary_ID" , nullable = false)
    private Long diaryId;


    public Likes(Long diaryId, Long memberId){
        this.diaryId = diaryId;
        this.memberId = memberId;
    }

}
