package project.danim.bucket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.danim.bucket.domain.Bucket;

import java.util.Optional;

public interface BucketRepository extends JpaRepository<Bucket, Long> {

    Optional<Bucket> findByBucketId(Long bucketId);

}
