package com.rolebasejwttoken.dto;

import javax.persistence.Column;
import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.Length;

import com.rolebasejwttoken.model.Role;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserDTO {
	
	private Integer id;
	
	
	@Column(nullable = false, length = 64)
	@Length(min = 5, max = 255)
	private String Name;

	

	
	
	
	@Column(nullable = false, length = 50, unique = true)
	@Email
	@Length(min = 5, max = 50)
	private String email;

	@Column(nullable = false, length = 64)
	@Length(min = 5, max = 64)
	private String password;
	
	
	

	private Role userRole;

}
