package com.rolebasejwttoken.controller;

import java.util.Collection;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rolebasejwttoken.jwt.JwtTokenUtil;
import com.rolebasejwttoken.model.AuthRequest;
import com.rolebasejwttoken.model.AuthResponse;
import com.rolebasejwttoken.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthApi {

	@Autowired
	private JwtTokenUtil jwtUtil;

	
	
	
	
	
	
	
	
	
//	@PreAuthorize("hasRole('ROLE_USER') and hasRole('ROLE_ADMIN')")
//	@Secured({"ROLE_USER", "ROLE_ADMIN"})
//	 @Secured("ROLE_USER")
	
	
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
	public ResponseEntity<AuthResponse> createToken(@Valid @RequestBody AuthRequest authenticationRequest)
	        throws Exception {
	    try {
	        this.authenticate(authenticationRequest.getEmail(), authenticationRequest.getPassword());

	        UserDetails userDetails = this.userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
	        String token = this.jwtUtil.generateToken(userDetails);

	        AuthResponse response = new AuthResponse();
	        response.setAccessToken(token);
	        response.setEmail(userDetails.getUsername());  // Include email in the response
	        response.setUserRole(getRoleFromAuthorities(userDetails.getAuthorities())); // Extract role from authorities

	        return new ResponseEntity<>(response, HttpStatus.OK);
	    } catch (BadCredentialsException e) {
	        throw new BadCredentialsException("Invalid username or password");
	    }
	}

	

	private String getRoleFromAuthorities(Collection<? extends GrantedAuthority> authorities) {
	    for (GrantedAuthority authority : authorities) {
	        if (authority.getAuthority().startsWith("ROLE_")) {
	            return authority.getAuthority().substring(5);
	        }
	    }
	    return null; // If no role is found
	}


	
	
	
	
	
	
	
	
	
	private void authenticate(String email, String password) throws Exception {
		// TODO Auto-generated method stub

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email,
				password);

		try {
			this.authenticationManager.authenticate(authenticationToken);
		} catch (BadCredentialsException e) {
			System.out.println("invalid details");

			throw new BadCredentialsException("Invalid username or password");

		}
	
	
	
	
	
	
	
	
	}
	
	
	
}
