package project.danim.diary.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import project.danim.audit.BaseTime;
import project.danim.likes.domain.Likes;
import project.danim.member.domain.Member;
import project.danim.reply.domain.Reply;
import project.danim.tag.domain.Tag;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    private String question;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    /*
    지역, 날씨 nullable = false로 바꿔야 합니다.
     */
    @Column(nullable = false)
    private String weather;

    @Column(nullable = false)
    private String area;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private int cost;

    @Column(nullable = false, name ="likes_count")
    private int likesCount;

//    @BatchSize(size = 10)
//    @Column(nullable = false)
//    @ElementCollection(fetch = FetchType.EAGER)
//    @CollectionTable(name = "diary_tag", joinColumns = @JoinColumn(name = "diary_id"))
//    private List<String> tags;
    @Column(nullable = false)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "diary_image", joinColumns = @JoinColumn(name = "diary_id"))
    private List<String> diaryImages;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private LocalDate travelDate;

    public Diary(String title, String question, String content, String weather, String area, String city, int cost, int likesCount, Long memberId, LocalDate travelDate){
        this.title = title;
        this.question = question;
        this.content = content;
        this.weather = weather;
        this.area = area;
        this.city = city;
        this.cost = cost;
        this.likesCount = likesCount;
//        this.tags = tags;
        this.memberId = memberId;
        this.travelDate = travelDate;
    }

    public void plusLikesCount() {
        this.likesCount = this.likesCount + 1;
    }

    public void minusLikesCount() {
        this.likesCount = this.likesCount - 1;
    }

    public void updateDiary(String title, String content, String weather, String area, String city, int cost, LocalDate travelDate) {
        this.title = title;
        this.content = content;
        this.weather = weather;
        this.area = area;
        this.city = city;
        this.cost = cost;
        this.travelDate = travelDate;
    }

    public void addDiaryImages(List<String> diaryImages) {
        this.diaryImages = diaryImages;
    }

    /*

    Diary : Nenber = > 다 대 1  관계
     */

//    @ManyToOne   // (1)
//    @JoinColumn(name = "MEMBER_ID")  // (2)
//    private Member member;


    /*
    Diary : random  = > 다 대 1 관계
     */
/*
    @ManyToOne   // (1)
    @JoinColumn(name = "RANDOM_ID")  // (2)
    private Random random;

  */

//    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Tag> tags = new ArrayList<>();


    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> replies = new ArrayList<>();

    public void addReply(Reply reply) {
        this.replies = replies;
    }



    //private AggregateReference<Member, Long> memberId;
/*
    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL)
    Set<Likes> likes = new HashSet<>();

 */

}
