package com.rolebasejwttoken.controller;

import java.net.URI;
import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rolebasejwttoken.model.FieldInspection;
import com.rolebasejwttoken.repository.FieldInspectionRepository;
import com.rolebasejwttoken.service.FieldInspectionService;

@RestController
@RequestMapping("/auth")
public class FieldInspectionController {

	@Autowired private FieldInspectionService service;
	
	@PostMapping
	@RolesAllowed("ADMIN")
	public ResponseEntity<FieldInspection> create(@RequestBody @Valid FieldInspection fieldInspection) {
		FieldInspection savedProduct = service.saveData(fieldInspection);
		URI productURI = URI.create("/products/" + savedProduct.getId());
		return ResponseEntity.created(productURI).body(savedProduct);
	}
	
	@GetMapping("/getallFieldInspection")
	@RolesAllowed({"ROLE_USER", "ROLE_ADMIN"})
	public List<FieldInspection> list() {
		return service.getALL();
	}
	
	
	
	
         @GetMapping("/getdata/{id}")
	public FieldInspection getById(@PathVariable("id") int id) {
		return service.getById(id);

	}

         @PostMapping("/saveFieldInspection")
	public FieldInspection saveData(@RequestBody FieldInspection field) {
		return service.saveData(field);

	}

	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable("id") int id) {
		service.deleteById(id);

	}
	
	
}