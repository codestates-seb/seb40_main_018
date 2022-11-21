package project.danim.image.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.danim.image.domain.Attachment;
import project.danim.image.domain.Image;

import java.util.HashMap;
import java.util.Map;

public interface ImageRepository extends JpaRepository<Attachment, Long> {
}
