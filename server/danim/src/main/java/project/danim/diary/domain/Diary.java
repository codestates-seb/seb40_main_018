package project.danim.diary.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import project.danim.audit.BaseTime;
import project.danim.likes.domain.Likes;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


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

    /*
    지역, 날씨 nullable = false로 바꿔야 합니다.
     */
    @Column(nullable = true)
    private String weather;

    @Column(nullable = true)
    private String area;
    @Column(nullable = false)
    private int cost;

    @CreatedDate
    private LocalDateTime createdDate = LocalDateTime.now();

    @LastModifiedDate
    private LocalDateTime modifiedDate = LocalDateTime.now();

    public Diary(long diaryId, String title, String content, String weather, String area, int cost){
        this.diaryId = diaryId;
        this.title = title;
        this.content = content;
        this.weather = weather;
        this.area = area;
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
/*
    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL)
    Set<Likes> likes = new HashSet<>();

 */

}
