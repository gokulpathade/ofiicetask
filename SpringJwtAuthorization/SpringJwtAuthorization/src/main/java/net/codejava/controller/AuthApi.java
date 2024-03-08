package net.codejava.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.codejava.jwt.JwtTokenUtil;
import net.codejava.model.AuthRequest;
import net.codejava.model.AuthResponse;
import net.codejava.model.CustomUserDetails;
import net.codejava.model.User;

@RestController
@RequestMapping("/auth")
public class AuthApi {
	@Autowired
	AuthenticationManager authManager;
	@Autowired
	JwtTokenUtil jwtUtil;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
	    try {
	        Authentication authentication = authManager.authenticate(
	                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

	        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
	        // Now you can get the User object from CustomUserDetails
	        User user = customUserDetails.getUser();

	        String accessToken = jwtUtil.generateAccessToken(user);
	        AuthResponse response = new AuthResponse(user.getEmail(), accessToken);

	        return ResponseEntity.ok().body(response);

	    } catch (BadCredentialsException ex) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
	}

}
