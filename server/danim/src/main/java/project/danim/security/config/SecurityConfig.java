package project.danim.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import project.danim.member.service.AuthService;
import project.danim.security.handler.MemberAccessDeniedHandler;
import project.danim.security.handler.MemberAuthenticationEntryPoint;
import project.danim.security.handler.MemberAuthenticationFailureHandler;
import project.danim.security.handler.MemberAuthenticationSuccessHandler;
import project.danim.security.jwt.JwtAuthenticationFilter;
import project.danim.security.jwt.JwtTokenizer;
import project.danim.security.jwt.JwtVerificationFilter;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
    private final JwtTokenizer jwtTokenizer;
    private final AuthService authService;

    private static final String[] DOC_URLS = {
            "/swagger-ui.html/**", "/configuration/**","/swagger-resources/**", "/v2/api-docs","/webjars/**"
    };

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers(DOC_URLS);
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable() // no cookie no CSRF
                .cors(Customizer.withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/member/register").permitAll()
                        .antMatchers(HttpMethod.GET, "/member/me/**").authenticated()
                        .antMatchers(HttpMethod.POST, "/member/me").authenticated()
                        .antMatchers(HttpMethod.POST, "/diary").authenticated()
                        .antMatchers(HttpMethod.POST, "/likes/*").authenticated()
//                      .antMatchers(HttpMethod.GET,"/bucket-list").authenticated()
                        .antMatchers(HttpMethod.GET,"/bucket-list").authenticated()
                        .antMatchers(HttpMethod.POST,"/bucket-list").authenticated()
                        .antMatchers(HttpMethod.GET, "/check-list").authenticated()
                        .antMatchers(HttpMethod.POST,"/check-list").authenticated()
                        .antMatchers(HttpMethod.POST,"/reply/{diary-id}").authenticated()
                        .antMatchers(HttpMethod.POST,"/tag/{diary-id}").authenticated()
                        .anyRequest().permitAll());

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.addAllowedOriginPattern("*");
        configuration.addExposedHeader("*");
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
        configuration.addAllowedHeader(CorsConfiguration.ALL);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, authService);
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer);

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
