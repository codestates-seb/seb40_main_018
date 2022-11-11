package project.danim.check.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.danim.check.domain.Check;

import java.util.Optional;

public interface CheckRepository extends JpaRepository<Check, Long> {

    Optional<Check> findByCheckId(Long checkId);


}
