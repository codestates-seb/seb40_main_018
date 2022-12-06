package project.danim.check.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.danim.bucket.domain.Bucket;
import project.danim.check.domain.Check;

import java.util.List;
import java.util.Optional;

public interface CheckRepository extends JpaRepository<Check, Long> {

    Optional<Check> findByCheckId(Long checkId);

    List<Check> findByMemberId(Long memberId);

}
