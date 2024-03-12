package com.security.controller;



@RestController
@RequestMapping("/auth")
public class AuthApi {

	
	@Autowired
	JwtTokenUtil jwtUtil;

//	@PostMapping("/login")
//	public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
//	    try {
//	        Authentication authentication = authManager.authenticate(
//	                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
//
//	        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
//	        // Now you can get the User object from CustomUserDetails
//	        User user = customUserDetails.getUser();
//
//	        String accessToken = jwtUtil.generateAccessToken(user);
//	        AuthResponse response = new AuthResponse(user.getEmail(), accessToken);
//
//	        return ResponseEntity.ok().body(response);
//
//	    } catch (BadCredentialsException ex) {
//	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//	    }
//	}

	 @Autowired
	    private AuthenticationManager authenticationManager;

	    @Autowired
	    private UserService userDetailsService;


	
	
	
	

	    @PostMapping("/login")
	    public ResponseEntity<AuthResponse> createToken(@Valid @RequestBody AuthRequest authenticationRequest) {  
	    	this.authenticate(
	              authenticationRequest.getUsername(), authenticationRequest.getPassword()
	        );
	    	
	    	
	    	
//	    	final Authentication authentication = authenticationManager.authenticate(
//	                new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
//	        );
//
	         UserDetails userDetails = this.userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

	        String token =this.jwtUtil.generateToken(userDetails);
	        AuthResponse response = new AuthResponse();
	        response.setAccessToken(token);
	        
	        
//
//	        // Use authenticationRequest.getEmail() instead of email
	         return new ResponseEntity< AuthResponse>(response, HttpStatus.OK  );
	    
	    
	    
	    
	    }







		private void authenticate(String username, String password) {
			// TODO Auto-generated method stub
			
			
			 UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password); 
			this.authenticationManager.authenticate(authenticationToken);
	
		
		
		
		
		
		 }





	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
}
