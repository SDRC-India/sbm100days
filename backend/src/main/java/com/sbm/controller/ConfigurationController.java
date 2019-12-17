package com.sbm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sbm.service.ConfigurationService;

/**
 * @author subham
 *
 */
@RestController
public class ConfigurationController {

	@Autowired
	private ConfigurationService configurationService;

	@GetMapping("/createDesgAuthorityMapping")
	public ResponseEntity<String> createDesgAuthorityMapping() {
		
		return configurationService.createDesgAuthorityMapping();
	}
	
	
	@GetMapping("/config")
	public ResponseEntity<String> config() {
		
		return configurationService.config();
	}
	
	@GetMapping("/configureQuestionTemplate")
	private boolean configureQuestionTemplate()
	{
		return configurationService.configureQuestionTemplate();
	}

}
