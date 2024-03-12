package com.security.dto;



@Data
@Getter
@Setter
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
	
	
	

	private Role role;

}
