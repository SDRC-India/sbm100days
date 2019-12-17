package com.sbm.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sbm.model.AreaModel;
import com.sbm.model.UserDetailsModel;
import com.sbm.model.ValueObjectModel;
import com.sbm.service.WebService;
import com.sbm.util.TokenInfoExtracter;

/**
 * @author subham
 *
 */
@RestController
public class WebController {

	@Autowired
	private WebService webService;

	@Autowired
	private TokenInfoExtracter tokenInfoExtracter;

	@ResponseBody
	@RequestMapping(value = "/getAllArea")
	public Map<String, List<AreaModel>> getArea() {

		return webService.getAllAreaList();

	}

	@ResponseBody
	@RequestMapping(value = "/getAreaForReports")
	public Map<String, List<AreaModel>> getAreaList(OAuth2Authentication auth) {

		Map<String, Object> tokenInfo = tokenInfoExtracter.tokenInfo(auth);

		Map<String, Object> sessionMap = (Map<String, Object>) tokenInfo.get("sessionMap");
		Map<String, Object> areaMap = (Map<String, Object>) sessionMap.get("area");

		return webService.getAllAreaList(Integer.parseInt(areaMap.get("sbmAreaId").toString()));

	}

	@RequestMapping(value = "/getTypeDetails")
	public List<ValueObjectModel> getTypeDetails() {
		return webService.getTypeDetails();

	}
	
	@RequestMapping(value = "/getUsers")
	public List<UserDetailsModel> getAllUsers(@RequestParam("roleId") Integer roleId , @RequestParam("areaId") Integer areaId) {

		return webService.getAllUsers(roleId,areaId);
	}
	
	@RequestMapping(value = "/getTypes")
	public List<ValueObjectModel> getTypes() {
		return webService.getTypes();

	}
	
}
