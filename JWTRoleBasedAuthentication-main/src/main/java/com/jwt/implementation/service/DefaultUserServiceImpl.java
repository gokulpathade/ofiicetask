package com.jwt.implementation.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.jwt.implementation.model.Role;
import com.jwt.implementation.model.User;
import com.jwt.implementation.model.UserDTO;
import com.jwt.implementation.repository.UserRepository;

@Service
public class DefaultUserServiceImpl implements DefaultUserService, UserDetails{

	@Autowired
	UserRepository userRepo;
	
	
	
	@Autowired
	User user;
	
	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	
	
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		 User user = userRepo.findByUserName(username);
	     return new org.springframework.security.core.userdetails.User(user.getUserName(),
	    		 user.getPassword(), mapRolesToAuthorities(user.getRoles()));
	}
	
	
	
	
	  public Collection<? extends GrantedAuthority> mapRolesToAuthorities(Set<Role> roles) {
	        return roles.stream()
	                .map(role -> new SimpleGrantedAuthority(role.name())) // Use role.name()
	                .collect(Collectors.toList());
	    }

	
	
	
	
	
	  @Override
	  public User save(UserDTO userRegisteredDTO) {
	      User user = new User();
	      user.setEmail(userRegisteredDTO.getEmail());
	      user.setUserName(userRegisteredDTO.getUserName());
	      user.setPassword(passwordEncoder.encode(userRegisteredDTO.getPassword()));

	      // Assuming your roles are stored as a Set<Role> in the User object
	      Set<Role> roles = Arrays.stream(userRegisteredDTO.getRoles().split(","))
	              .map(Role::valueOf)
	              .collect(Collectors.toSet());

	      user.setRoles(roles);

	      return userRepo.save(user);
	  }







	  @Override
	  public Collection<? extends GrantedAuthority> getAuthorities() {
	      Set<SimpleGrantedAuthority> authorities = user.getRoles().stream()
	              .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
	              .collect(Collectors.toSet());

	      return authorities;
	  }

	    @Override
	    public String getPassword() {
	        return user.getPassword();
	    }

	    @Override
	    public String getUsername() {
	        return user.getUserName();
	    }

	    @Override
	    public boolean isAccountNonExpired() {
	        // Implement your logic for account expiration
	        return true;
	    }

	    @Override
	    public boolean isAccountNonLocked() {
	        // Implement your logic for account locking
	        return true;
	    }

	    @Override
	    public boolean isCredentialsNonExpired() {
	        // Implement your logic for credentials expiration
	        return true;
	    }

	    @Override
	    public boolean isEnabled() {
	        // Implement your logic for account enablement
	        return true;
	    }  
	  
}
