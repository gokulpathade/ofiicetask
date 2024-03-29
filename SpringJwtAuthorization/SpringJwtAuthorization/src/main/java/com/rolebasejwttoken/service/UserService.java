package com.rolebasejwttoken.service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.rolebasejwttoken.dto.UserDTO;
import com.rolebasejwttoken.model.Role;
import com.rolebasejwttoken.model.User;
import com.rolebasejwttoken.repository.UserRepository;

@Service
@Transactional
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository repository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public User save(UserDTO userDto) {

		User user = new User();

		user.setEmail(userDto.getEmail());
		user.setPassword(passwordEncoder.encode(userDto.getPassword()));
		user.setUserRole(userDto.getUserRole());
        user.setName(userDto.getName());
		// Save the user object with encoded password
		return repository.save(user);
	}

	public List<User> getALL() {
		return repository.findAll();
	}

	public User getById(int id) {
		return repository.findById(id).get();

	}

	public void deleteById(int id) {
		repository.deleteById(id);

	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = this.repository.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
				getAuthorities(user.getUserRole()));
	}

	private Collection<? extends GrantedAuthority> getAuthorities(Role role) {
		return Collections.singletonList(new SimpleGrantedAuthority(role.name()));
	}

}

//	
//	
//	   @Override
//	    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//	        User user = repository.findByEmail(username)
//	                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
//
//	        return new org.springframework.security.core.userdetails.User(
//	                user.getEmail(),
//	                user.getPassword(),
//	                getAuthorities(user.getRole())
//	        );
//	    }
//
//	    private Collection<? extends GrantedAuthority> getAuthorities(Collection<Role> role) {
//	        return role.stream()
//	                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
//	                .collect(Collectors.toList());
//	    }

//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//	    User user = this.repository.findByEmail(username)
//	            .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
//
//	    return new CustomUserDetails(user);
//	}
//	
