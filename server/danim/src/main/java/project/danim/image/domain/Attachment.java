package project.danim.image.domain;

import lombok.*;
import project.danim.image.repository.AttachmentType;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SequenceGenerator(name = "ATTACHMENT_SEQ_GENERATOR", sequenceName = "ATTACHMENT_SEQ")
public class Attachment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String originFilename;

    private String storeFilename;

    @Enumerated(EnumType.STRING)
    private AttachmentType attachmentType;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "DIARY_ID")
//    private Diary diary;

    @Builder
    public Attachment(Long id, String originFilename, String storeFilename, AttachmentType attachmentType) {
        this.id = id;
        this.originFilename = originFilename;
        this.storeFilename = storeFilename;
        this.attachmentType = attachmentType;
    }

}
