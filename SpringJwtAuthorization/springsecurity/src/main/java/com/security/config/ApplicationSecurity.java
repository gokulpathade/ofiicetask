package com.security.config;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
//@EnableWebSecurity(debug = true)
public class ApplicationSecurity extends WebSecurityConfigurerAdapter {

//    @Autowired 
//    private UserRepository userRepo;
//
//    @Autowired
//    private JwtTokenFilter jwtTokenFilter;
//    
    
    
    
    
    
    
    
    
    
	@Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    
    
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenFilter jwtRequestFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.csrf().disable()
//            .authorizeRequests()
//                .antMatchers("/authenticate").permitAll()
//                .anyRequest().authenticated()
//                .and().sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//
//        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
//    }

    
    
    
    
    
    
    
    
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
      
            
        http.csrf(csrf -> csrf.disable());
        http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.exceptionHandling()
        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
        .and()
        .authorizeRequests(requests -> requests
                .antMatchers("/auth/**", "/users/**").permitAll()
                .antMatchers("/auth/admin/**").hasRole("ADMIN")
                .antMatchers("/auth/fieldeng/**").hasRole("FIELDENGINEER")
                .antMatchers("/auth/principal/**").hasAnyRole("PRINCEPALENGINEER","ADMIN")// Adjust role as needed
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

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }


    
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    
    
    
    
    
    
    
    
    
    
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(username ->
//                userRepo.findByEmail(username)
//                        .map(user -> new CustomUserDetails(user))
//                        .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found")));
//    }

//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }

   

//    @Override
//    @Bean
//    public AuthenticationManager authenticationManagerBean() throws Exception {
//        return super.authenticationManagerBean();
//    }
//    
//    
    
    
    
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth, UserDetailsService userDetailsService) throws Exception {
        auth.userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());
    }

    
    
}