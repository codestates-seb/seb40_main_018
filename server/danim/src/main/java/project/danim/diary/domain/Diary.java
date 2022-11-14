package project.danim.diary.domain;

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
    @OneToMany(mappedBy = "diary")
    private List<Tag> tags = new ArrayList<>();
*/

    /*
    @OneToMany(mappedBy = "diary")
    private List<Member> members = new ArrayList<>();

    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> replys = new ArrayList<>();


     */

    //private AggregateReference<Member, Long> memberId;

}
