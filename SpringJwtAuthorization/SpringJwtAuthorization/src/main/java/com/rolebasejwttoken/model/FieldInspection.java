package com.rolebasejwttoken.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "FieldInspection")
public class FieldInspection {

	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;	
	
	@Column(nullable = false, length = 128)
	@NotNull @Length(min = 5, max = 128)
	private String name;
	
    private String location;
    private Double progress;
    private Date date;
    private String Status;
    private String Remark;
	
    
    
    
    
    
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    
    
    
    
    
    /**
	 * @return the user
	 */
	public User getUser() {
		return user;
	}
	/**
	 * @param user the user to set
	 */
	public void setUser(User user) {
		this.user = user;
	}
	/**
	 * 
	 */
	public FieldInspection() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param id
	 * @param name
	 * @param location
	 * @param progress
	 * @param date
	 * @param status
	 * @param remark
	 * @param user
	 */
	public FieldInspection(Integer id, @NotNull @Length(min = 5, max = 128) String name, String location,
			Double progress, Date date, String status, String remark, User user) {
		super();
		this.id = id;
		this.name = name;
		this.location = location;
		this.progress = progress;
		this.date = date;
		Status = status;
		Remark = remark;
		this.user = user;
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
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the location
	 */
	public String getLocation() {
		return location;
	}
	/**
	 * @param location the location to set
	 */
	public void setLocation(String location) {
		this.location = location;
	}
	/**
	 * @return the progress
	 */
	public Double getProgress() {
		return progress;
	}
	/**
	 * @param progress the progress to set
	 */
	public void setProgress(Double progress) {
		this.progress = progress;
	}
	/**
	 * @return the date
	 */
	public Date getDate() {
		return date;
	}
	/**
	 * @param date the date to set
	 */
	public void setDate(Date date) {
		this.date = date;
	}
	/**
	 * @return the status
	 */
	public String getStatus() {
		return Status;
	}
	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		Status = status;
	}
	/**
	 * @return the remark
	 */
	public String getRemark() {
		return Remark;
	}
	/**
	 * @param remark the remark to set
	 */
	public void setRemark(String remark) {
		Remark = remark;
	}
    
	
	

}
