package com.sbm.service;

import org.springframework.http.ResponseEntity;

/**
 * @author subham
 *
 */
public interface ConfigurationService {

	ResponseEntity<String> createDesgAuthorityMapping();

	ResponseEntity<String> config();
	
	public boolean configureQuestionTemplate();

}
