package com.sbm.service;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.sdrc.usermgmt.core.util.IUserManagementHandler;
import org.sdrc.usermgmt.domain.Account;
import org.sdrc.usermgmt.domain.AccountDesignationMapping;
import org.sdrc.usermgmt.domain.Designation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sbm.domain.Area;
import com.sbm.domain.TypeDetails;
import com.sbm.domain.UserAreaMapping;
import com.sbm.domain.UserAuditTrail;
import com.sbm.domain.UserDetails;
import com.sbm.repository.CustomAccountDesignationMappingRepository;
import com.sbm.repository.UserAreaMappingRepository;
import com.sbm.repository.UserAuditTrailRepository;
import com.sbm.repository.UserDetailsRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * @author Subham Ashish(subham@sdrc.co.in)
 *
 */
@Service
@Slf4j
public class SessionMapInitializerClass implements IUserManagementHandler {

	@Autowired
	private UserAreaMappingRepository userAreaMappingRepository;

	@Autowired
	private UserDetailsRepository userDetailsRepository;

	 @Autowired
	 private UserAuditTrailRepository userAuditTrailRepository;
	
	@Autowired
	@Qualifier("customAccountDesignationMappingRepository")
	private CustomAccountDesignationMappingRepository customAccountDesignationMappingRepository;

	/**
	 * This method will return the session for an user.
	 * 
	 * @param account contains the user information
	 * @return sessionMap contains logged in users details
	 * 
	 * @author subrata
	 */
	@Override
	@Transactional
	public Map<String, Object> sessionMap(Object account) {

		/**
		 * setting extra parameters to be sent while user logged in.
		 */
		Map<String, Object> sessionMap = new HashMap<>();

		UserAreaMapping userArea = userAreaMappingRepository.findByUser(((Account) account));

		Area area = userArea.getArea();

		sessionMap.put("area", area);
		return sessionMap;

	}

	/**
	 * Saving the user details.
	 * 
	 * @param map contains all the user information to save the new user in database. 
	 * @param account contains the user information
	 * 
	 * @author subrata
	 */
	@Override
	@Transactional
	public boolean saveAccountDetails(Map<String, Object> map, Object account) {
		/**
		 * Before inserting in database, checking all the necessary information are exists or not.
		 */
		if (map.get("name") == null || map.get("name").toString().isEmpty())
			throw new RuntimeException("key : name not found in map");

		if (map.get("mblNo") == null || map.get("mblNo").toString().isEmpty())
			throw new RuntimeException("key : mblNo not found in map");

		if (map.get("typeDetailsId") == null || map.get("typeDetailsId").toString().isEmpty())
			throw new RuntimeException("key : typeDetailsId not found in map");

		if (map.get("areaId") == null || map.get("areaId").toString().isEmpty())
			throw new RuntimeException("key : areaId not found in map");
		try {
			/**
			 * save UserDetails
			 */
			UserDetails user = new UserDetails();
			user.setAccount((Account) account);
			user.setMobileNumber(map.get("mblNo").toString());
			user.setName(map.get("name").toString());
			user.setTypeDetails(new TypeDetails((Integer) map.get("typeDetailsId")));
			userDetailsRepository.save(user);

			/**
			 * SAVE user-Area Mapping
			 */
			UserAreaMapping uaMapping = new UserAreaMapping();
			uaMapping.setUser((Account) account);
			uaMapping.setArea(new Area((Integer) map.get("areaId")));
			userAreaMappingRepository.save(uaMapping);

			return true;
		} catch (Exception e) {
			log.error("Action: while creating user with payload {} " + map, e);
			throw new RuntimeException(e);
		}

	}

	/**
	 * Updating the user details.
	 * 
	 * @param map contains all the user information to update for a particular user. 
	 * @param account contains the user information
	 * 
	 * @author subrata
	 */
//	@Override
//	@Transactional
//	public boolean updateAccountDetails(Map<String, Object> map, Object account) {
//
//	}

	@Override
	public boolean updateAccountDetails(Map<String, Object> map, Object account, Principal p) {

		if (map.get("name") == null || map.get("name").toString().isEmpty())
			throw new RuntimeException("key : name not found in map");

		if (map.get("mblNo") == null || map.get("mblNo").toString().isEmpty())
			throw new RuntimeException("key : mblNo not found in map");

		if (map.get("typeDetailsId") == null || map.get("typeDetailsId").toString().isEmpty())
			throw new RuntimeException("key : typeDetailsId not found in map");
		
		if (map.get("role") == null || map.get("role").toString().isEmpty())
			throw new RuntimeException("key : role not found in map");
		
		if (map.get("areaId") == null || map.get("areaId").toString().isEmpty())
		throw new RuntimeException("key : areaId not found in map");
		boolean flag = false;
		try {
			UserAuditTrail auditTrail = new UserAuditTrail();
			/**
			 * Getting the UserDetails for that that account.
			 */
			UserDetails user = userDetailsRepository.findByAccountId(((Account)account).getId());
			/**
			 * Updating the user information.
			 * If MobileNumber is provided, then updating.
			 */
			if(!(map.get("mblNo").toString()).equals(user.getMobileNumber())) {
				auditTrail.setMobileNumber(user.getMobileNumber());
				user.setMobileNumber(map.get("mblNo").toString());
				flag = true;
			}
			/**
			 * If name is provided, then updating.
			 */
			if(!(map.get("name").toString()).equals(user.getName())) {
				auditTrail.setName(user.getName());
				user.setName(map.get("name").toString());
				flag = true;
			}
			/**
			 * If typeDetailsId is provided, then updating.
			 */
			if(((Integer) map.get("typeDetailsId")).intValue() != user.getTypeDetails().getTypeDetailId()) {
				auditTrail.setTypeDetailId(user.getTypeDetails().getTypeDetailId());
				user.setTypeDetails(new TypeDetails((Integer) map.get("typeDetailsId")));
				flag = true;
			}
			
			/**
			 * Getting the UserAreaMapping for that that account.
			 */
			UserAreaMapping uaMapping = userAreaMappingRepository.findByUser((Account)account);
			/**
			 * If areaId is provided, then updating.
			 */
			if(((Integer) map.get("areaId")).intValue() != uaMapping.getArea().getAreaId()) {
				auditTrail.setAreaId(uaMapping.getArea().getAreaId());
				uaMapping.setArea(new Area((Integer) map.get("areaId")));
				flag = true;
			}
			/**
			 * Getting the AccountDesignationMapping for that that account.
			 */
			AccountDesignationMapping adm = customAccountDesignationMappingRepository.findByAccount((Account)account);
			/**
			 * If role is provided, then updating.
			 */
			if(((Integer) map.get("role")).intValue() != adm.getDesignation().getId()) {
				auditTrail.setDesignationId(adm.getDesignation().getId());
				adm.setDesignation(new Designation((Integer) map.get("role")));
				flag = true;
			}
			/**
			 * If any one information is changed, then we are saving in the auditTrail table.
			 */
			if(flag == true) {
				auditTrail.setAccountId(((Account)account).getId());
				userAuditTrailRepository.save(auditTrail);
				return true;
			}
			
			return false;
		} catch (Exception e) {
			log.error("Action: while creating user with payload {} " + map, e);
			throw new RuntimeException(e);
		}
	}

	@Override
	public List<?> getAllAuthorities() {

		//sub // TODO Auto-generated method stub
		return null;
	}

}
