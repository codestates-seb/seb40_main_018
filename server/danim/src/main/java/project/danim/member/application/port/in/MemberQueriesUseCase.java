package project.danim.member.application.port.in;

import project.danim.member.application.port.in.response.MemberResponseForProfile;

public interface MemberQueriesUseCase {
    MemberResponseForProfile getMyProfile(String email);
}
