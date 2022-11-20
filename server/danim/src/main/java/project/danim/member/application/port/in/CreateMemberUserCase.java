package project.danim.member.application.port.in;

import project.danim.member.application.port.in.request.CreateMemberCommand;

public interface CreateMemberUserCase {
    void createMember(CreateMemberCommand createMemberCommand);
}
