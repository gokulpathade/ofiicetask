package net.codejava.controller;

import java.util.List;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.codejava.model.User;
import net.codejava.service.UserService;


@RestController
@RequestMapping("/auth")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/save")
     public User saveUser(@RequestBody User user) {
    	 return userService.save(user);
    	 
     }
	
	
	@GetMapping("/getall")
//	@RolesAllowed("ROLE_ADMIN")
	public List< User> getAllUser(){
		return userService.getAllUser();
	}
}
