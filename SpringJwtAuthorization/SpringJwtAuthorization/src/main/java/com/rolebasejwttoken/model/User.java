package com.rolebasejwttoken.model;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false, length = 64)
	@Length( max = 255)
	private String Name;

	@Column(nullable = false, length = 50, unique = true)
	@Email
	@Length( max = 255)
	private String email;

	@Column(nullable = false, length = 64)
	@Length(min = 5, max = 64)
	private String password;

	@Enumerated(EnumType.STRING)
	private Role userRole;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private List<FieldInspection> fieldInspection;

	/**
	 * @param id
	 * @param name
	 * @param email
	 * @param password
	 * @param userRole
	 * @param fieldInspection
	 */
	public User(Integer id, @Length(min = 5, max = 255) String name, @Email @Length(min = 5, max = 50) String email,
			@Length(min = 5, max = 64) String password, Role userRole, List<FieldInspection> fieldInspection) {
		super();
		this.id = id;
		Name = name;
		this.email = email;
		this.password = password;
		this.userRole = userRole;
		this.fieldInspection = fieldInspection;
	}

	/**
	 * 
	 */
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return Name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		Name = name;
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the userRole
	 */
	public Role getUserRole() {
		return userRole;
	}

	/**
	 * @param userRole the userRole to set
	 */
	public void setUserRole(Role userRole) {
		this.userRole = userRole;
	}

	/**
	 * @return the fieldInspection
	 */
	public List<FieldInspection> getFieldInspection() {
		return fieldInspection;
	}

	/**
	 * @param fieldInspection the fieldInspection to set
	 */
	public void setFieldInspection(List<FieldInspection> fieldInspection) {
		this.fieldInspection = fieldInspection;
	}

}