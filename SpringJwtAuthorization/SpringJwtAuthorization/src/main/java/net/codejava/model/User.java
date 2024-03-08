package net.codejava.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "users")
public class User  {


	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false, length = 50, unique = true)
	@Email
	@Length(min = 5, max = 50)
	private String email;

	@Column(nullable = false, length = 64)
	@Length(min = 5, max = 64)
	private String password;
	
	
	
	
	@ElementCollection(targetClass = Role.class)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;
	
	
	
	

//	 @ManyToMany(cascade = CascadeType.ALL)
//	    @JoinTable(
//	        name = "users_roles",
//	        joinColumns = @JoinColumn(name = "user_id"),
//	        inverseJoinColumns = @JoinColumn(name = "role_id")
//	    )
//	   @ElementCollection(targetClass = Role.class)
//	    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
//	    @Enumerated(EnumType.STRING)
//	    private Set<Role> roles;
////	    private Set<Role> roles = new HashSet<>();

//	  @ManyToMany(fetch = FetchType.EAGER)
//	    @JoinTable(
//	            name = "user_roles",
//	            joinColumns = @JoinColumn(name = "user_id"),
//	            inverseJoinColumns = @JoinColumn(name = "role_id")
//	    )
//	    private Collection<? extends GrantedAuthority> authorities;
	
	/**
	 * 
	 */
	public User() {
//		this.authorities = null;
//		super();
		// TODO Auto-generated constructor stub
	}


	/**
	 * @param id
	 * @param email
	 * @param password
	 * @param authorities
	 */
	public User(Integer id, @Email @Length(min = 5, max = 50) String email, @Length(min = 5, max = 64) String password,
			Set<? extends GrantedAuthority> authorities) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
//		this.authorities = authorities;
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

//	@Override
//	public Collection<? extends GrantedAuthority> getAuthorities() {
//		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
//		for (Role role : roles) {
//			authorities.add(new SimpleGrantedAuthority(role.getName()));
//		}
//		return authorities;
//	}

//	
//	 public Collection<? extends GrantedAuthority> getAuthorities() {
////	        return authorities;
//	    }

	


	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public void addRole(Role role) {
		this.roles.add(role);
	}


	
	
	
	
	
}
