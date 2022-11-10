package project.danim;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class DanimApplication {

	public static void main(String[] args) {
		SpringApplication.run(DanimApplication.class, args);
	}

}
