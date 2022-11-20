package project.danim.member.application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.danim.exeption.ExceptionCode;
import project.danim.member.adapter.out.persistence.MemberRepositoryPersistenceAdapter;
import project.danim.member.application.port.in.request.CreateMemberCommand;
import project.danim.member.application.port.in.CreateMemberUserCase;
import project.danim.member.domain.Member;
import project.danim.member.domain.MemberExistsException;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService implements CreateMemberUserCase {

    private final MemberRepositoryPersistenceAdapter memberPersistenceAdapter;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void createMember(CreateMemberCommand createMemberCommand) {
        verifyExistsEmail(createMemberCommand.getEmail());

        Member newMember = Member.builder()
                .email(createMemberCommand.getEmail())
                .password(passwordEncoder.encode(createMemberCommand.getPassword()))
                .nickname(createMemberCommand.getNickname())
                .build();

        memberPersistenceAdapter.createMember(newMember);
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberPersistenceAdapter.findByEmail(email);
        if (member.isPresent()) {
            throw new MemberExistsException(ExceptionCode.MEMBER_EXISTS);
        }
    }
}
