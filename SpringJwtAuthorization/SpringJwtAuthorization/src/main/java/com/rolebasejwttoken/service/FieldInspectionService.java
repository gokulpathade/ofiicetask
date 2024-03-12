package com.rolebasejwttoken.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rolebasejwttoken.model.FieldInspection;
import com.rolebasejwttoken.repository.FieldInspectionRepository;

@Service
public class FieldInspectionService {

	@Autowired
	private FieldInspectionRepository repository;

	public List<FieldInspection> getALL() {
		return repository.findAll();
	}

	public FieldInspection getById(int id) {
		return repository.findById(id).get();

	}

	public FieldInspection saveData(FieldInspection field) {
		return repository.save(field);

	}

	
	public void deleteById(int id) {
		 repository.deleteById(id);

	}
	
	
}