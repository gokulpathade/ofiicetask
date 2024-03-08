package com.jwt.implementation.model;


public enum Role {
    ROLE_USER,
    ROLE_ADMIN,
	    
//	    @ManyToOne
//	    @JoinColumn(name = "user_id") // adjust the column name accordingly
//	    private User user;
//	    
	    
//	    @ManyToMany(cascade = CascadeType.ALL)
////	    @ManyToOne
//		@JoinColumn(name = "userid")
//		// name should match the actual column name in your database
//		private User user;

//    @Override
//    public String getAuthority() {
//        return role;
//    }
}












//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.Table;
//
//@Entity
//@Table(name="role")
//public class Role {
//	
//	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
//	private int id;
//	
//	private String role;
//	
//	
//
//	public Role() {
//		super();
//	}
//
//	public Role(String role) {
//		super();
//		this.role = role;
//	}
//
//	public int getId() {
//		return id;
//	}
//
//	public void setId(int id) {
//		this.id = id;
//	}
//
//	public String getRole() {
//		return role;
//	}
//
//	public void setRole(String role) {
//		this.role = role;
//	}
//
//	
//	
//}