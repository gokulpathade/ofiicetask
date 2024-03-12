package com.rolebasejwttoken.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//@NoArgsConstructor
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AuthRequest {
	

	//	@NotNull @Email @Length(min = 5, max = 50)
	private String email;
	
//	@NotNull @Length(min = 5, max = 10)
	private String password;

	
   
}
