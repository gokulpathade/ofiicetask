package com.security.controller;



@RestController
@RequestMapping("/auth")
public class UserController {

	@Autowired
	private UserService userService;
	
	
	
	
	
	
	
	
	
	

	
	
	
	

	@PostMapping("/save")
	  public ResponseEntity<User> saveUser(@RequestBody UserDTO userDto) {
    	 return ResponseEntity.ok(userService.save(userDto));
    	 
     }

	
	@GetMapping("/admin/getall")
	@RolesAllowed("ADMIN")
	public List<User> getAllUser() {
	    return userService.getALL();
	}
	
//	@GetMapping("/getall")
//	@RolesAllowed("ROLE_ADMIN")
////	@PreAuthorize("hasRole('ROLE_ADMIN')")
//	public List< User> getAllUser(){
//		return userService.getAllUser();
//	}



//
//public List<User> getALL() {
//	return repository.findAll();
//}

public User getById(int id) {
	return userService.getById(id);

}

//public UserDTO saveData(Use field) {
//	return repository.save(field);
//
//}


public String deleteById(int id) {
	userService.deleteById(id);

	return "user deleted successfully";
}


}





