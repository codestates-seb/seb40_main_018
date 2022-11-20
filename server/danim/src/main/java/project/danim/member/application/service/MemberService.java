package project.danim.member.application.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.danim.member.adapter.out.persistence.MemberRepositoryPersistenceAdapter;
import project.danim.member.application.port.in.request.CreateMemberCommand;
import project.danim.member.application.port.in.CreateMemberUserCase;
import project.danim.member.domain.Member;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService implements CreateMemberUserCase {

    private final MemberRepositoryPersistenceAdapter memberPersistenceAdapter;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void createMember(CreateMemberCommand createMemberCommand) {
        Member newMember = Member.builder()
                .email(createMemberCommand.getEmail())
                .password(passwordEncoder.encode(createMemberCommand.getPassword()))
                .nickname(createMemberCommand.getNickname())
                .build();

        memberPersistenceAdapter.createMember(newMember);
    }


}
