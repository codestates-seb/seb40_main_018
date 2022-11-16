package project.danim.member.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.danim.exeption.ExceptionCode;
import project.danim.member.domain.Member;
import project.danim.member.domain.MemberNotFoundException;
import project.danim.member.dto.MemberCreateForm;
import project.danim.member.repository.MemberRepository;
import project.danim.security.jwt.JwtTokenizer;

import javax.transaction.Transactional;
import java.util.*;

import static project.danim.member.service.MemberServiceHelper.*;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final MemberRepository memberRepository;
    private final JwtTokenizer jwtTokenizer;
    private final PasswordEncoder passwordEncoder;

    public void createMember(MemberCreateForm memberCreateForm) {
        verifyExistsEmail(memberRepository, memberCreateForm.getEmail());

        // Role에 대한 메서드는 서비스 것일까 도메인 것일까 아니면 다른 서비스의 것일까??

        Member newMember = Member.builder()
                .email(memberCreateForm.getEmail())
                .password(passwordEncoder.encode(memberCreateForm.getPassword()))
                .nickname(memberCreateForm.getNickname())
                .roles(List.of("USER"))
                .build();

        memberRepository.save(newMember);
    }
    public void saveRefreshToken(Member member, String refreshToken) {
        member.saveRefreshToken(refreshToken);

        memberRepository.save(member);
    }

    public Map<String, String> accessTokenReissue(String refreshToken) {
        Jws<Claims> claimsJws = jwtTokenizer.getClaims(refreshToken, jwtTokenizer.encodeBase64SecretKey((jwtTokenizer.getSecretKey())));

        Long id = Long.getLong(claimsJws.getBody().getSubject());
        Member member = memberRepository.findById(id).orElseThrow(() -> new MemberNotFoundException(ExceptionCode.MEMBER_NOT_FOUND));

        if (!member.getRefreshToken().equals(refreshToken)) {
            throw new JwtException("유효하지 않은 Refresh Token 입니다.");
        }

        String accessToken = delegateAccessToken(member);

        Map<String, String> resultTokens = new HashMap<>();
        resultTokens.put("Authorization", "Bearer " + accessToken);
        resultTokens.put("Refresh", refreshToken);

        return resultTokens;
    }

    public String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = String.valueOf(member.getMemberId());
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    public String delegateRefreshToken(Member member) {
        String subject = String.valueOf(member.getMemberId());
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
