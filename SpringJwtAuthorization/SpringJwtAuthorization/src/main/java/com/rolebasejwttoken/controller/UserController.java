package com.rolebasejwttoken.controller;

import java.util.List;

import javax.annotation.security.RolesAllowed;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rolebasejwttoken.dto.UserDTO;
import com.rolebasejwttoken.model.User;
import com.rolebasejwttoken.service.UserService;


@RestController
@RequestMapping("/auth")
public class UserController {

	@Autowired
	private UserService userService;
	
	
	
	
	
	
	
	
	
	

	
	
	
	

	@PostMapping("/save")
	  public ResponseEntity<User> saveUser(@RequestBody UserDTO userDto) {
    	 return ResponseEntity.ok(userService.save(userDto));
    	 
     }

	
//	@GetMapping("/getall")
////	@RolesAllowed("ADMIN")
////	@Secured({"ROLE_USER", "ROLE_ADMIN"})
//	@Secured("ADMIN")
//	public List<User> getAllUser() {
//	    return userService.getALL();
//	}

	
	
	
	@GetMapping("/getall")
	@Secured("ROLE_ADMIN")
	public List<User> getAllUser() {
		
	    Logger logger = LoggerFactory.getLogger(UserController.class);
		
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    // Log or inspect roles
	    logger.info("User {} has roles: {}", authentication.getName(), authentication.getAuthorities());

	    return userService.getALL();
	}

	
	
	
	
	
//	@GetMapping("/getall")
//	@RolesAllowed("ROLE_ADMIN")
////	@PreAuthorize("hasRole('ROLE_ADMIN')")
//	public List< User> getAllUser(){
//		return userService.getAllUser();
//	}



//
//public List<User> getALL() {
//	return repository.findAll();
//}

public User getById(int id) {
	return userService.getById(id);

}

//public UserDTO saveData(Use field) {
//	return repository.save(field);
//
//}


public String deleteById(int id) {
	userService.deleteById(id);

	return "user deleted successfully";
}


}





