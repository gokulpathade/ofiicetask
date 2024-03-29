package com.security.controller;












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
