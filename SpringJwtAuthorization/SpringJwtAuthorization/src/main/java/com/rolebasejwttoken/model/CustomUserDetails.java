

package com.rolebasejwttoken.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class CustomUserDetails implements UserDetails {

    private User user;

    private String email;
    private String password;
    private List<GrantedAuthority> authorities;

    public CustomUserDetails(User user) {
        this.user = user;
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getUserRole().name()));

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
















//package com.rolebasejwttoken.model;
//
//
//
//
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.rolebasejwttoken.repository.UserRepository;
//
//import java.util.Collection;
//import java.util.Collections;
//import java.util.List;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//public class CustomUserDetails implements UserDetails {
//
//private User user;
//	
//	
//	
//	 private String email;
//	    private String password;
//	    private List<GrantedAuthority> authorities;
//
//	    public CustomUserDetails(User user) {
//	        this.user = user;
//	        this.email = user.getEmail();
//	        this.password = user.getPassword();
//	        this.authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getUserRole().name()));
//	    }
//
//		@Override
//	    public Collection<? extends GrantedAuthority> getAuthorities() {
//	        return this.authorities;
//	    }
//
//	    @Override
//	    public String getPassword() {
//	        return this.password;
//	    }
//
//	    @Override
//	    public String getUsername() {
//	        return this.email;
//	    }
//
//	    @Override
//	    public boolean isAccountNonExpired() {
//	        return true;
//	    }
//
//	    @Override
//	    public boolean isAccountNonLocked() {
//	        return true;
//	    }
//
//	    @Override
//	    public boolean isCredentialsNonExpired() {
//	        return true;
//	    }
//
//	    @Override
//	    public boolean isEnabled() {
//	        return true;
//	    }
//}