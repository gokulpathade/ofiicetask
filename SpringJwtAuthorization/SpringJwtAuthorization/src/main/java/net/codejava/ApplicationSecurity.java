package net.codejava;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import net.codejava.jwt.JwtTokenFilter;
import net.codejava.model.CustomUserDetails;
import net.codejava.repository.UserRepository;

//@EnableWebSecurity(debug = true)
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
//@EnableWebSecurity(debug = true)
public class ApplicationSecurity extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtTokenFilter jwtTokenFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(username ->
                userRepo.findByEmail(username)
                        .map(user -> new CustomUserDetails(user))
                        .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found")));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable());
        http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.authorizeRequests(requests -> requests
                .antMatchers("/auth/**", "/users/**").permitAll()
                .antMatchers("/auth/getall").hasRole("ADMIN") // Adjust role as needed
                .anyRequest().authenticated());

        http.exceptionHandling(handling -> handling
                .authenticationEntryPoint(
                        (request, response, ex) -> {
                            response.sendError(
                                    HttpServletResponse.SC_UNAUTHORIZED,
                                    ex.getMessage()
                            );
                        }
                ));

        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }



    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    
    
    
    
    
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth, UserDetailsService userDetailsService) throws Exception {
        auth.userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());
    }

    
    
}