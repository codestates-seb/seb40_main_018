package project.danim.member.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.danim.member.dto.MemberCreateForm;
import project.danim.member.service.AuthService;
import project.danim.member.service.MemberService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Validated MemberCreateForm memberCreateForm) {

        authService.createMember(memberCreateForm);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/refresh")
    public ResponseEntity refresh(HttpServletRequest request, HttpServletResponse response) {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        String refreshToken = request.getHeader("Refresh");

        Map<String, String> tokens = authService.accessTokenReissue(refreshToken);
        response.setHeader(HttpHeaders.AUTHORIZATION, tokens.get("Authorization"));
        response.setHeader("Refresh", tokens.get("Refresh"));

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
