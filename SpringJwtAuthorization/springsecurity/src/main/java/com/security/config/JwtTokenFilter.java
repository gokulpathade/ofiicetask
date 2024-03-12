package com.security.config;


@Component
public class JwtTokenFilter extends OncePerRequestFilter {

   



	private final JwtTokenUtil jwtUtil;

private UserService userService;


	
	
	private static final Logger log = LoggerFactory.getLogger(JwtTokenUtil.class);
    
    
//    CustomUserDetails customUserDetails = new CustomUserDetails(user);

    
    
    
    public JwtTokenFilter(JwtTokenUtil jwtUtil ) {
        this.jwtUtil = jwtUtil;
       
        
    }

    
    
    
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        if (!hasAuthorizationBearer(request)) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//        String token = getAccessToken(request);
//        if (!jwtUtil.validateToken(token, null)) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//        setAuthenticationContext(token, request);
//        filterChain.doFilter(request, response);
//    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        final String requestTokenHeader = request.getHeader("Authorization");

        System.out.println(requestTokenHeader); // check what we get here
        String username = null;
        String jwtToken = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            log.debug("Received JWT Token: {}", jwtToken);
            // ... rest of the code

            try {
                username = this.jwtUtil.getUsernameFromToken(jwtToken);
            } catch (IllegalArgumentException e) {
                logger.info("Illegal Argument while fetching the username !!");
                e.printStackTrace();
            } catch (ExpiredJwtException e) {
                logger.info("Given jwt token is expired !!");
                e.printStackTrace();
            } catch (MalformedJwtException e) {
                logger.info("Some changed has done in token !! Invalid Token");
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            logger.info("Invalid Header Value !! ");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userService.loadUserByUsername(username);
            Boolean validateToken = this.jwtUtil.validateToken(jwtToken, userDetails);

            if (validateToken) {
                // Check if the roles are correctly applied
                Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
                System.out.println("User Authorities: " + authorities);
                
                // set the authentication
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, authorities);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                logger.info("Validation fails !!");
            }
        } else {
            System.out.println("user name is null or context is not null");
        }

        chain.doFilter(request, response);
    }

    
    
    


  
}