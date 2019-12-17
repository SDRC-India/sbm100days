package com.sbm;

import org.sdrc.usermgmt.core.annotations.EnableUserManagementWithJWTJPASecurityConfiguration;
import org.sdrc.usermgmt.core.util.UgmtClientCredentials;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

/**
 * @author subham
 *
 */
@Component
@EnableUserManagementWithJWTJPASecurityConfiguration
public class Loader {

	@Bean
	public UgmtClientCredentials ugmtClientCredentials(){
		return new UgmtClientCredentials("web","pass");
	}
	
}
