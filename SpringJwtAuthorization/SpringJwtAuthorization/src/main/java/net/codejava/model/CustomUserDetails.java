package net.codejava.model;





import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import net.codejava.repository.UserRepository;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public class CustomUserDetails implements UserDetails {

    private final User user;
    private  Set<? extends GrantedAuthority> authorities;
    
//    private UserRepository repository;
  

   

  
    
    
    
    
    

    
   









	/**
	 * @param user
	 */
	public CustomUserDetails(User user) {
//		super();
		this.user = user;
	}







	   public User getUser() {
	        return user;
	    }











	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
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