package com.jwt.implementation.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jwt.implementation.config.JwtGeneratorValidator;
import com.jwt.implementation.model.User;
import com.jwt.implementation.model.UserDTO;
import com.jwt.implementation.repository.UserRepository;
import com.jwt.implementation.service.DefaultUserService;

@RestController
public class RestAppController {

	@Autowired
	UserRepository userRepo;

	@Autowired
	AuthenticationManager authManager;

	@Autowired
	JwtGeneratorValidator jwtGenVal;

	@Autowired
	BCryptPasswordEncoder bcCryptPasswordEncoder;

	@Autowired
	DefaultUserService userService;

	@PostMapping("/registration")
	public ResponseEntity<Object> registerUser(@RequestBody UserDTO userDto) {
		User users = userService.save(userDto);
		if (users.equals(null))
			return generateRespose("Not able to save user ", HttpStatus.BAD_REQUEST, userDto);
		else
			return generateRespose("User saved successfully : " + users.getId(), HttpStatus.OK, users);
	}

	
	
	
	
	
	
	
	
//	@PostMapping("/login")
//	public ResponseEntity<String> generateJwtToken(@RequestBody UserDTO userDto) {
//	    try {
//	        Authentication authentication = authManager
//	                .authenticate(new UsernamePasswordAuthenticationToken(userDto.getUserName(), userDto.getPassword()));
//	        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//	        String jwtToken = jwtGenVal.generateToken(authentication);
//	        return ResponseEntity.ok(jwtToken);
//	    } catch (AuthenticationException e) {
//	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//	    }
//	}

	
	
	
	
//	@PostMapping("/login")
//	public ResponseEntity<?> login(@RequestBody UserDTO request) {
//	    try {
//	        Authentication authentication = authManager.authenticate(
//	                new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));
//	        SecurityContextHolder.getContext().setAuthentication(authentication);
//	      
//	        DefaultUserServiceImpl customUserDetails = (DefaultUserServiceImpl) authentication.getPrincipal();
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
//	
	
	
	
	
	
	@GetMapping("/welcomeAdmin")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String welcome() {
		return "WelcomeAdmin";
	}
	
	
	
	
	
	

	@GetMapping("/welcomeUser")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public String welcomeUser() {
		return "WelcomeUSER";
	}

	
	
	
	
	
	
	
	
	
	
	public ResponseEntity<Object> generateRespose(String message, HttpStatus st, Object responseobj) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("meaasge", message);
		map.put("Status", st.value());
		map.put("data", responseobj);

		return new ResponseEntity<Object>(map, st);
	}

}
