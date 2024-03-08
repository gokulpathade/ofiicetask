package net.codejava.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import net.codejava.model.CustomUserDetails;
import net.codejava.model.User;
import net.codejava.repository.UserRepository;

@Service
@Transactional

public class UserService implements UserDetailsService {
	@Autowired private UserRepository repo;
	@Autowired private PasswordEncoder passwordEncoder;
	
	
	
//	public User save(User user) {
//		// String rawPassword = user.getPassword();
//		// String encodedPassword = passwordEncoder.encode(rawPassword);
//		// user.setPassword(encodedPassword);
//		
//	user.setEmail();
//		
//		return repo.save(user);
//	}
//	
//	
	
	
	
	
	
	public User save(User user) {
		
		  user.setEmail(user.getEmail());
//	        user.setFullname(user.getFullname());
	        user.setRoles(user.getRoles());

	        // Encode and set the password for the provided user object
	        user.setPassword(passwordEncoder.encode(user.getPassword()));
	        
	        // Save the user object with encoded password
	        return repo.save(user);
	}



	 

	    @Override
	    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	        User user = repo.findByEmail(username)
	                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

	        return new CustomUserDetails(user); // Use CustomUserDetails instead of User
	    }
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    public List<User> getAllUser() {
	    	return repo.findAll();
	    }
	
	
}