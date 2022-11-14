package project.danim.diary.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import project.danim.audit.BaseTime;

import javax.persistence.*;



@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "DIARY")
public class Diary extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long diaryId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private int weather;

    @Column(nullable = true)
    private int cost;


    public Diary(long diaryId, String title, String content, int weather, int cost){
        this.diaryId = diaryId;
        this.title = title;
        this.content = content;
        this.weather = weather;
        this.cost = cost;
    }


    /*

    Diary : Nenber = > 다 대 1  관계
     */
/*
    @ManyToOne   // (1)
    @JoinColumn(name = "MEMBER_ID")  // (2)
    private Member member;
*/

    /*
    Diary : random  = > 다 대 1 관계
     */
/*
    @ManyToOne   // (1)
    @JoinColumn(name = "RANDOM_ID")  // (2)
    private Random random;

  */

    /*
    Diary : TAG  = > 1 대 다 관계
     */

   /*
    @OneToMany(mappedBy = "diary")
    private List<Tag> tags = new ArrayList<>();
*/

    /*

     1대 다 관계

    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> replys = new ArrayList<>();


     */

    //private AggregateReference<Member, Long> memberId;

}
